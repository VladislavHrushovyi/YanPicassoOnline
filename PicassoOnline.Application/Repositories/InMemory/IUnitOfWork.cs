using PicassoOnline.Domain.Models.Entities;

namespace PicassoOnline.Application.Repositories.InMemory;

public interface IUnitOfWork
{
    public ISessionDataRepository SessionDataRepository { get; }

    public Task SaveChangesAsync();
}