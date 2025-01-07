namespace PicassoOnline.Application.Repositories.InMemory;

public interface ISessionDataRepository
{
    public Task<string> GetBase64ById(int id);
    public Task<int> UpdateBase64Image(int id, string base64String);
    public Task<int> InitNewData(string userName);
}