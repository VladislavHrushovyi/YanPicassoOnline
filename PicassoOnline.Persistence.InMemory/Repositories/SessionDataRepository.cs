using Microsoft.EntityFrameworkCore;
using PicassoOnline.Application.Repositories.InMemory;

namespace PicassoOnline.Persistence.InMemory.Repositories;

public class SessionDataRepository(LocalDbContext context) : ISessionDataRepository
{
    private readonly LocalDbContext context = context;

    public async Task<string> GetBase64ById(int id)
    {
        var model = await context.LocalDetailedData.FirstOrDefaultAsync(x => x.Id == id)!;
        if (model == null)
        {
            return "";
        }
        
        return model.Base64Image;
    }

    public async Task<int> UpdateBase64Image(int id, string base64String)
    {
        var model = await context.LocalDetailedData.FirstOrDefaultAsync(x => x.Id == id);
        if (model != null)
        {
            model.Base64Image = base64String;
            context.LocalDetailedData.Update(model);
            return model.Id;
        }
        await context.SaveChangesAsync();
        return -1;
    }
}