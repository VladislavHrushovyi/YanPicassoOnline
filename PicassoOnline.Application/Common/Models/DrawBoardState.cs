using System.Buffers;
using System.Collections.Concurrent;

namespace PicassoOnline.Application.Common.Models;

public class DrawBoardState
{
    public int DetailedDataId { get; set; }
    public User Owner { get; set; }
    public ConcurrentBag<User> ConnectedUsers { get; set; }
}