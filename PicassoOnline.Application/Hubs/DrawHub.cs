using Microsoft.AspNetCore.SignalR;
using PicassoOnline.Domain.Models.DrawBoard;
using System.Collections.Concurrent;
using System.Text.Json;
using PicassoOnline.Application.Common.Models;

namespace PicassoOnline.Application.Hubs;

public class DrawHub : Hub
{
    private new static readonly ConcurrentDictionary<string, DrawBoardState> Groups = new();
    public override async Task OnConnectedAsync()
    {
        var connId = Context.ConnectionId;
        if (Groups.ContainsKey(connId)) return;
        Console.WriteLine(connId);
        Groups.TryAdd(connId, new DrawBoardState());
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        var connId = Context.ConnectionId;
        if (Groups.TryGetValue(connId, out var state))
        {
            Groups.TryRemove(connId, out state);
            Console.WriteLine(connId + " disconnected name" + state.OwnerName);
        }
    }

    public string Create(string userName)
    {
        var connId = Context.ConnectionId;
        
        var boardState = new DrawBoardState()
        {
            OwnerName = userName,
            CurrentBoardStateBase64 = "",
            ConnectedUsers = new ConcurrentBag<ConnectedUser>(),
            OwnerConnId = connId
            
        };
        if (Groups.ContainsKey(connId))
        {
            Groups[connId] = boardState;
            Console.WriteLine($"Created {connId} name {userName}");
        }
        return connId;
    }

    public async Task<bool> UpdateDrawBoard(string drawBoardName, string base64Image)
    {
        return await Task.Run(() =>
        {
            var connId = Context.ConnectionId;
            Console.WriteLine(base64Image.Substring(0, 25));
            if (!Groups.TryGetValue(drawBoardName, out var boardState)) return false;

            if (boardState.OwnerConnId != connId) return false;

            boardState.CurrentBoardStateBase64 = base64Image;
            return true;
        });
    }

    public string GetDrawBoardState(string drawBoardName)
    {
        var connId = Context.ConnectionId;

        if (!Groups.TryGetValue(drawBoardName, out var boardState)) return "";
        
        if(connId != boardState.OwnerConnId) return "";
        
        return boardState.CurrentBoardStateBase64;
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
        
        boardState.CurrentBoardStateBase64 = "";
        
        if (boardState.OwnerConnId != connId)
        {
            await Clients.Client(boardState.OwnerConnId).SendAsync("");
        }

        if (boardState.ConnectedUsers.Any(x => x.ConnId == connId))
        {
            await Clients.Users((IReadOnlyList<string>)boardState.ConnectedUsers.Where(c => c.ConnId != connId)).SendAsync("");
        }
        
    }

    public UsersByDrawField GetUserByDrawField(string drawBoardName)
    {
        if (!Groups.TryGetValue(drawBoardName, out var boardState)) return new UsersByDrawField();

        var users = new UsersByDrawField()
        {
            Owner = boardState.OwnerName,
            UsersName = boardState.ConnectedUsers.Select(x => x.UserName).ToList()
        };

        return users;
    }
    public string GetAllUser()
    {
        var users = Groups.Select(x => new
        {
            connId = x.Key,
            name = x.Value.OwnerName,
            img = x.Value.CurrentBoardStateBase64
        });
        
        return JsonSerializer.Serialize(users);
    }
}