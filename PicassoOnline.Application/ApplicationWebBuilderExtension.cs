﻿using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http.Connections;
using PicassoOnline.Application.Hubs;

namespace PicassoOnline.Application;

public static class ApplicationWebBuilderExtension
{
    public static void UseApplication(this WebApplication app)
    {
        app.MapHub<DrawHub>("/draw", opt =>
        {
            opt.TransportMaxBufferSize = 102400;
            opt.Transports = HttpTransportType.WebSockets;
            opt.TransportSendTimeout = TimeSpan.FromSeconds(10);
        }).RequireCors("AllowSpecificOrigins");
    }
}