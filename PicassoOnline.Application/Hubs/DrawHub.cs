using Microsoft.AspNetCore.SignalR;
using PicassoOnline.Domain.Models.DrawBoard;

namespace PicassoOnline.Application.Hubs;

public class DrawHub : Hub
{
    private readonly Dictionary<string, List<DrawBoardState>> _drawBoardStates = new();

    public bool Create(string drawBoardName, string userId)
    {
        return false;
    }
    
    public bool Join(string userId)
    {
        return false;
    }

    public bool UpdateDrawBoard(string drawBoardName, string base64Image)
    {
        return false;
    }

    public string GetDrawBoardState(string drawBoardName)
    {
        return "";
    }

    public bool AddUserToBoard(string drawBoardName, string userId)
    {
        return false;
    }

    public string BorderInteractBroadcast(string drawBoardName, string data)
    {
        return data;
    }

    public string ClearDrawBoard()
    {
        return "";
    }
}