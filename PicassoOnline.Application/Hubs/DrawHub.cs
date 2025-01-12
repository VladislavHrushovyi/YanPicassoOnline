using Microsoft.AspNetCore.SignalR;
using PicassoOnline.Domain.Models.DrawBoard;
using System.Collections.Concurrent;
using System.Text.Json;
using PicassoOnline.Application.Common.Models;
using PicassoOnline.Application.Repositories.InMemory;

namespace PicassoOnline.Application.Hubs;

public class DrawHub : Hub
{
    private readonly ConcurrentDictionary<string, DrawBoardState> _boardGroups = new();
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
        if (_boardGroups.TryGetValue(connId, out var state))
        {
            _boardGroups.TryRemove(connId, out state);
            Console.WriteLine(connId + " disconnected name" + state.OwnerName);
        }
    }

    public async Task<string> Create(string userName)
    {
        var connId = Context.ConnectionId;
        await this.Groups.AddToGroupAsync(connId, userName);
        var detailedDataId = await _sessionDataRepository.InitNewData(userName); 
        var boardState = new DrawBoardState()
        {
            OwnerName = userName,
            ConnectedUsers = new ConcurrentBag<ConnectedUser>(),
            OwnerConnId = connId,
            DetailedDataId = detailedDataId
            
        };
        if (_boardGroups.ContainsKey(connId))
        {
            _boardGroups[connId] = boardState;
            Console.WriteLine($"Created {connId} name {userName}");
        }
        else
        {
            _boardGroups.TryAdd(connId, boardState);
        }

        var response = new { connId, detailedDataId };
        return JsonSerializer.Serialize(response);
    }

    public bool AddUserToBoard(string userName, string userConnId)
    {
        if(!_boardGroups.TryGetValue(userConnId, out var boardState)) return false;

        var user = new ConnectedUser(userConnId, userName);
        
        boardState.ConnectedUsers.Add(user);

        return true;
    }

    public async Task BorderInteractBroadcast(string drawBoardName, string data)
    {
        var connId = Context.ConnectionId;
        
        if (!_boardGroups.TryGetValue(drawBoardName, out var boardState)) return;

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
        if (!_boardGroups.TryGetValue(drawBoardName, out var boardState)) return;
        
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
        if (!_boardGroups.TryGetValue(drawBoardName, out var boardState)) return "";

        var users = new
        {
            owner = boardState.OwnerName,
            usersName = boardState.ConnectedUsers.Select(x => x.UserName).ToList()
        };

        return JsonSerializer.Serialize(users);
    }
    public string GetAllUser()
    {
        var users = _boardGroups.Select(x => new
        {
            connId = x.Key,
            name = x.Value.OwnerName,
            detailedDataId = x.Value.DetailedDataId,
        });
        
        return JsonSerializer.Serialize(users);
    }
}