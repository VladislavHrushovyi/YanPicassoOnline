using System.Reflection;
using FluentValidation;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using PicassoOnline.Application.Common.Behaviours;

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
        services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());
        services.AddMediatR(opt =>
        {
            opt.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly());
            opt.AddBehavior(typeof(IPipelineBehavior<,>), typeof(ValidationBehaviour<,>));
        });
    }
}