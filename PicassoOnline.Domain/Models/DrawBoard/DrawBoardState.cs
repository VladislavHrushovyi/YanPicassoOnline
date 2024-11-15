using System.Collections.Concurrent;

namespace PicassoOnline.Domain.Models.DrawBoard;

public class DrawBoardState
{
    public string CurrentBoardStateBase64 { get; set; }
    public string OwnerConnId { get; set; }
    public ConcurrentBag<string> UsersConnId { get; set; }
}