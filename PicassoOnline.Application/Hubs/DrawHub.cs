using Microsoft.AspNetCore.SignalR;
using PicassoOnline.Domain.Models.DrawBoard;
using System.Collections.Concurrent;
using System.Text.Json;
using PicassoOnline.Application.Repositories.InMemory;

namespace PicassoOnline.Application.Hubs;

public class DrawHub : Hub
{
    private new static ConcurrentDictionary<string, DrawBoardState> Groups = new();
    private readonly ISessionDataRepository _sessionDataRepository;

    public DrawHub(ISessionDataRepository sessionDataRepository)
    {
        _sessionDataRepository = sessionDataRepository;
    }

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
            Console.WriteLine(connId + " disconnected name" + state.OwnerName);
        }
    }

    public async Task<string> Create(string userName)
    {
        var connId = Context.ConnectionId;
        var detailedDataId = await _sessionDataRepository.InitNewData(userName); 
        var boardState = new DrawBoardState()
        {
            OwnerName = userName,
            ConnectedUsers = new ConcurrentBag<ConnectedUser>(),
            OwnerConnId = connId,
            DetailedDataId = detailedDataId
            
        };
        Groups.TryAdd(connId, boardState);
        var response = new { connId, detailedDataId };
        return JsonSerializer.Serialize(response);
    }

    public bool AddUserToBoard(string userName, string userConnId)
    {
        if(!Groups.TryGetValue(userConnId, out var boardState)) return false;

        var user = new ConnectedUser(userConnId, userName);
        
        boardState.ConnectedUsers.Add(user);

        return true;
    }

    public async Task BorderInteractBroadcast(string drawBoardName, string data)
    {
        var connId = Context.ConnectionId;
        
        if (!Groups.TryGetValue(drawBoardName, out var boardState)) return;

        if (boardState.OwnerConnId != connId)
        {
            await Clients.Client(boardState.OwnerConnId).SendAsync(data);
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
        
        if (boardState.OwnerConnId != connId)
        {
            await Clients.Client(boardState.OwnerConnId).SendAsync("");
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
            owner = boardState.OwnerName,
            usersName = boardState.ConnectedUsers.Select(x => x.UserName).ToList()
        };
        return JsonSerializer.Serialize(users);
    }
    public string GetAllUser()
    {
        var users = Groups.Select(x => new
        {
            connId = x.Key,
            name = x.Value.OwnerName,
            detailedDataId = x.Value.DetailedDataId,
        });
        
        return JsonSerializer.Serialize(users);
    }
}