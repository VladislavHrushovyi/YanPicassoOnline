using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using PicassoOnline.Application.Repositories.InMemory;
using PicassoOnline.Persistence.InMemory.Repositories;

namespace PicassoOnline.Persistence.InMemory;

public static class ServiceExtension
{
    public static void AddInMemoryDatabase(this IServiceCollection services)
    {
        services.AddDbContext<LocalDbContext>(opt => opt.UseInMemoryDatabase("PicassoDbLocal"));
        //services.AddTransient<ISessionDataRepository, SessionDataRepository>();
        services.AddScoped<IUnitOfWork, UnitOfWork>();
    }
}