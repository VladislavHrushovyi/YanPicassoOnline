using PicassoOnline.Application.Repositories.InMemory;

namespace PicassoOnline.Persistence.InMemory.Repositories;

public class SessionDataRepository(LocalDbContext context) : ISessionDataRepository
{
    private readonly LocalDbContext context = context;

    public async Task<string> GetBase64ByDrawBoardName(int id)
    {
        Console.WriteLine("Test");
        return "";
    }

    public Task<int> AddBase64(int id, string base64String)
    {
        throw new NotImplementedException();
    }
}