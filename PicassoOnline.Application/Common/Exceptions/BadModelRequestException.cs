namespace PicassoOnline.Application.Common.Exceptions;

public sealed class BadModelRequestException : Exception
{
    public BadModelRequestException(string message) : base(message)
    {
        
    }

    public BadModelRequestException(string[] messages) : base(string.Join("/n", messages))
    {
        
    }
}