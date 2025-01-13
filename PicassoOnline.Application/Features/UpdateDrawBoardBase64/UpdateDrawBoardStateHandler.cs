using MediatR;
using PicassoOnline.Application.Repositories.InMemory;

namespace PicassoOnline.Application.Features.UpdateDrawBoardBase64;

public sealed class UpdateDrawBoardStateHandler : IRequestHandler<DrawBoardStateRequest, DrawBoardStateResponse>
{
    private readonly ISessionDataRepository _sessionDataRepository;

    public UpdateDrawBoardStateHandler(ISessionDataRepository sessionDataRepository)
    {
        _sessionDataRepository = sessionDataRepository;
    }

    public async Task<DrawBoardStateResponse> Handle(DrawBoardStateRequest request, CancellationToken cancellationToken)
    {
        var result = await _sessionDataRepository.UpdateBase64Image(request.DetailInfoId, request.Base64);
        return new DrawBoardStateResponse(){Id = result};
    }
}