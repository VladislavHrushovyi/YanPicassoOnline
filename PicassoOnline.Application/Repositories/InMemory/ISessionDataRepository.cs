namespace PicassoOnline.Application.Repositories.InMemory;

public interface ISessionDataRepository
{
    public Task<string> GetBase64ByDrawBoardName(int id);
    public Task<int> AddBase64(int id, string base64String);
}