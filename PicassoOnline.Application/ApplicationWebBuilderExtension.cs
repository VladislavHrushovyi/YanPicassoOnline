using Microsoft.AspNetCore.Builder;
using PicassoOnline.Application.Hubs;

namespace PicassoOnline.Application;

public static class ApplicationWebBuilderExtension
{
    public static void UseApplication(this WebApplication app)
    {
        app.MapHub<DrawHub>("/draw");
    }
}