namespace PicassoOnline.Domain.Models.DrawBoard;

public class DrawBoardState
{
    public string CurrentBoardStateBase64 { get; set; }
    public string Owner { get; set; }
    public List<string> Users { get; set; }
}