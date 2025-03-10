using Microsoft.AspNetCore.SignalR;
using System.Collections.Concurrent;
using System.Text.Json;
using PicassoOnline.Application.Common.Models;
using PicassoOnline.Application.Repositories.InMemory;

namespace PicassoOnline.Application.Hubs;

public class DrawHub(IUnitOfWork unitOfWork) : Hub
{
    private new static ConcurrentDictionary<string, DrawBoardState> Groups = new();
    private readonly ConcurrentBag<User> _users = new();

    public override async Task OnConnectedAsync()
    {
        Console.WriteLine(Context.ConnectionId + " has joined.");
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        var connId = Context.ConnectionId;
        Console.WriteLine(connId + " has left the connection.");
        if (Groups.TryGetValue(connId, out var state))
        {
            Groups.TryRemove(connId, out state);
            Console.WriteLine(connId + " disconnected name" + state.Owner.Name);
        }
    }

    public async Task CreateUser(string name, string role)
    {
        var connId = Context.ConnectionId;

        var user = new User()
        {
            Name = name,
            Role = role,
            ConnId = connId
        };
        
        _users.Add(user);
    }

    public async Task<string> Create()
    {
        var connId = Context.ConnectionId;
        var user = _users.FirstOrDefault(u => u.ConnId == connId);
        
        if (user != null) return string.Empty;
        
        var detailedDataId = await unitOfWork.SessionDataRepository.InitNewData(user.Name);
        
        var boardState = new DrawBoardState()
        {
            Owner = user,
            ConnectedUsers = new ConcurrentBag<User>(),
            DetailedDataId = detailedDataId
            
        };
        boardState.ConnectedUsers.Add(user);
        
        Groups.TryAdd(connId, boardState);
        var response = new { connId, detailedDataId };
        return JsonSerializer.Serialize(response);
    }

    public string AddUserToBoard(string userName, string boardId, string role)
    {
        Console.WriteLine($"Adding user {userName} to board {boardId}");
        if(!Groups.TryGetValue(boardId, out var boardState)) return String.Empty;
        
        var currConnId = Context.ConnectionId;
        if (boardState.Owner.ConnId == currConnId) return string.Empty;
        
        var user = new User()
        {
            Name = userName,
            ConnId = currConnId,
            Role = role
        };
        
        boardState.ConnectedUsers.Add(user);
        var responseJson = JsonSerializer.Serialize(new{boardId, detailedDataId = boardState.DetailedDataId});
        Console.WriteLine($"Response {responseJson}");
        return responseJson;
    }

    public async Task BorderInteractBroadcast(string drawBoardName, string data)
    {
        var connId = Context.ConnectionId;
        
        if (!Groups.TryGetValue(drawBoardName, out var boardState)) return;

        if (boardState.Owner.ConnId != connId)
        {
            await Clients.Client(boardState.Owner.ConnId).SendAsync(data);
        }

        if (boardState.ConnectedUsers.Any(x => x.ConnId == connId))
        {
            await Clients.Users((IReadOnlyList<string>)boardState.ConnectedUsers.Where(c => c.ConnId != connId)).SendAsync(data);
        }
    }

    public async Task ClearDrawBoard(string drawBoardName)
    {
        var connId = Context.ConnectionId;
        if (!Groups.TryGetValue(drawBoardName, out var boardState)) return;
        
        //await _sessionDataRepository.UpdateBase64Image(inr id, string base64) TODO
        
        if (boardState.Owner.ConnId != connId)
        {
            await Clients.Client(boardState.Owner.ConnId).SendAsync("");
        }

        if (boardState.ConnectedUsers.Any(x => x.ConnId == connId))
        {
            await Clients.Users((IReadOnlyList<string>)boardState.ConnectedUsers.Where(c => c.ConnId != connId)).SendAsync("");
        }
        
    }

    public string GetUserByDrawField(string drawBoardName)
    {
        if (!Groups.TryGetValue(drawBoardName, out var boardState)) return "";
        var users = new
        {
            owner = boardState.Owner.ConnId,
            usersName = boardState.ConnectedUsers.Select(x => x.Name).ToList()
        };
        return JsonSerializer.Serialize(users);
    }
    public string GetAllUser()
    {
        var users = Groups.Select(x => new
        {
            connId = x.Key,
            name = x.Value.Owner.Name,
            detailedDataId = x.Value.DetailedDataId,
        });
        
        return JsonSerializer.Serialize(users);
    }
}