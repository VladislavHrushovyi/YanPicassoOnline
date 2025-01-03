using MediatR;
using PicassoOnline.Application.Features.GetDrawBoardImage;
using PicassoOnline.Application.Features.UpdateDrawBoardBase64;

namespace PicassoOnline.Web.Endpoints;

public static class InfoDetailEndpointsExtension
{
    public static IEndpointRouteBuilder MapInfoDetailEndpoints(this IEndpointRouteBuilder endpoints)
    {
        endpoints.MapPost("/info-detail/update-base64Image", async (Mediator mediator, DrawBoardStateRequest req) => await mediator.Send(req));
        endpoints.MapGet("/info-detail/get-base64/{id}", async (Mediator mediator, int id) => await mediator.Send(new GetDrawBoardImageRequest(id)));
        return endpoints;
    }
}