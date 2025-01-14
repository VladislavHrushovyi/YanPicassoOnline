using PicassoOnline.Application.Repositories.InMemory;
using PicassoOnline.Domain.Models.Entities;

namespace PicassoOnline.Persistence.InMemory.Repositories;

public class UnitOfWork(LocalDbContext context) : IUnitOfWork
{
    public ISessionDataRepository SessionDataRepository => new SessionDataRepository(context);

    public async Task SaveChangesAsync()
    {
        await context.SaveChangesAsync();
    }
}