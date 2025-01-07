using MediatR;
using Microsoft.AspNetCore.Mvc;
using PicassoOnline.Application.Features.GetDrawBoardImage;
using PicassoOnline.Application.Features.InitSessionData;
using PicassoOnline.Application.Features.UpdateDrawBoardBase64;

namespace PicassoOnline.Web.Endpoints;

public static class InfoDetailEndpointsExtension
{
    public static RouteGroupBuilder MapInfoDetailEndpoints(this RouteGroupBuilder group)
    {
        group.MapPost("/update-base64Image", 
            async ([FromServices] IMediator mediator, [FromBody] DrawBoardStateRequest req) => await mediator.Send(req));
        group.MapPost("/init", 
            async ([FromServices] IMediator mediator, [FromBody] InitSessionDataRequest req) => await mediator.Send(req));
        group.MapGet("/get-base64/{id}", 
            async ([FromServices] IMediator mediator, [FromQuery] int id) => await mediator.Send(new GetDrawBoardImageRequest(id)));
        return group;
    }
}