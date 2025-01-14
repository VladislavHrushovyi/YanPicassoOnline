using Microsoft.EntityFrameworkCore;
using PicassoOnline.Application.Repositories.InMemory;
using PicassoOnline.Domain.Models.Entities;

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
        var model = await context.LocalDetailedData.SingleOrDefaultAsync(x => x.Id == id);
        if (model != null)
        {
            model.Base64Image = base64String;
            context.LocalDetailedData.Update(model);
            return model.Id;
        }
        
        return -1;
    }

    public async Task<int> InitNewData(string userName)
    {
        var model = new LocalDetailedData() { Base64Image = String.Empty, UserName = userName };
        var result = await context.LocalDetailedData.AddAsync(model);
        await context.SaveChangesAsync();

        return result.Entity.Id;
    }
}