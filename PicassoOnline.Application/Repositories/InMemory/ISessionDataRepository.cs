namespace PicassoOnline.Application.Repositories.InMemory;

public interface ISessionDataRepository
{
    public Task<string> GetBase64ByDrawBoardName(string drawBoardName);
    public Task<int> AddBase64(string base64String);
}