using Microsoft.Extensions.DependencyInjection;
using PicassoOnline.Application.Repositories.InMemory;
using PicassoOnline.Persistence.InMemory.Repositories;

namespace PicassoOnline.Persistence.InMemory;

public static class ServiceExtension
{
    public static void AddInMemoryDatabase(this IServiceCollection services)
    {
        services.AddDbContext<LocalDbContext>();
        services.AddTransient<ISessionDataRepository, SessionDataRepository>();
    }
}