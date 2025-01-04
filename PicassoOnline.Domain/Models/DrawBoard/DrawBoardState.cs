using System.Collections.Concurrent;

namespace PicassoOnline.Domain.Models.DrawBoard;

public class DrawBoardState
{
    public int DetailedDataId { get; set; }
    public string OwnerConnId { get; set; }
    public string OwnerName { get; set; }
    public ConcurrentBag<ConnectedUser> ConnectedUsers { get; set; }
}

public record ConnectedUser(string ConnId, string UserName);