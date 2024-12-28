using Microsoft.Extensions.DependencyInjection;

namespace PicassoOnline.Application;

public static class ApplicationServiceExtension
{
    public static void AddApplicationServices(this IServiceCollection services)
    {
        services.AddSignalR(opt =>
        {
            opt.MaximumReceiveMessageSize = 102400;
            opt.EnableDetailedErrors = true;
        });
    }
}