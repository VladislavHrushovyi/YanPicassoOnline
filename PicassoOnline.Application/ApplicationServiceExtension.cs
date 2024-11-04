using Microsoft.Extensions.DependencyInjection;

namespace PicassoOnline.Application;

public static class ApplicationServiceExtension
{
    public static void AddApplicationServices(this IServiceCollection services)
    {
        services.AddSignalR();
    }
}