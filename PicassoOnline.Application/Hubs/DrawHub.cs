using Microsoft.AspNetCore.SignalR;
using PicassoOnline.Domain.Models.DrawBoard;
using System.Collections.Concurrent;
namespace PicassoOnline.Application.Hubs;

public class DrawHub : Hub
{
    private new static readonly ConcurrentDictionary<string, DrawBoardState> Groups = new();
    public override async Task OnConnectedAsync()
    {
        Console.WriteLine($"{this.Context.ConnectionId} connected");
    }

    public bool Create(string drawBoardName, string userId)
    {
        var connId = Context.ConnectionId;
        if (Groups.ContainsKey(drawBoardName)) return false;
        
        var boardState = new DrawBoardState()
        {
            CurrentBoardStateBase64 = "",
            UsersConnId = new ConcurrentBag<string>(),
            OwnerConnId = connId
        };
        Groups.TryAdd(drawBoardName, boardState);
        
        return true;
    }

    public bool UpdateDrawBoard(string drawBoardName, string base64Image)
    {
        var connId = Context.ConnectionId;
        if (!Groups.TryGetValue(drawBoardName, out var boardState)) return false;
        
        if (boardState.OwnerConnId != connId) return false;
        
        boardState.CurrentBoardStateBase64 = base64Image;
        
        return true;

    }

    public string GetDrawBoardState(string drawBoardName)
    {
        var connId = Context.ConnectionId;

        if (!Groups.TryGetValue(drawBoardName, out var boardState)) return "";
        
        if(connId != boardState.OwnerConnId) return "";
        
        return boardState.CurrentBoardStateBase64;
    }

    public bool AddUserToBoard(string drawBoardName, string userConnId)
    {
        if(!Groups.TryGetValue(drawBoardName, out var boardState)) return false;
        
        boardState.UsersConnId.Add(userConnId);

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

        if (boardState.UsersConnId.Contains(connId))
        {
            await Clients.Users((IReadOnlyList<string>)boardState.UsersConnId.Where(c => c != connId)).SendAsync(data);
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

        if (boardState.UsersConnId.Contains(connId))
        {
            await Clients.Users((IReadOnlyList<string>)boardState.UsersConnId.Where(c => c != connId)).SendAsync("");
        }
        
    }
}