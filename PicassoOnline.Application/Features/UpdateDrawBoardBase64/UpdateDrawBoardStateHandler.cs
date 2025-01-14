using MediatR;
using PicassoOnline.Application.Repositories.InMemory;

namespace PicassoOnline.Application.Features.UpdateDrawBoardBase64;

public sealed class UpdateDrawBoardStateHandler(IUnitOfWork unitOfWork) : IRequestHandler<DrawBoardStateRequest, DrawBoardStateResponse>
{
    public async Task<DrawBoardStateResponse> Handle(DrawBoardStateRequest request, CancellationToken cancellationToken)
    {
        var result = await unitOfWork.SessionDataRepository.UpdateBase64Image(request.DetailInfoId, request.Base64);

        await unitOfWork.SaveChangesAsync();
        return new DrawBoardStateResponse {Id = result};
    }
}