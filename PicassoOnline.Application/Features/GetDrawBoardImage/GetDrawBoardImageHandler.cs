using MediatR;
using PicassoOnline.Application.Repositories.InMemory;

namespace PicassoOnline.Application.Features.GetDrawBoardImage;

public class GetDrawBoardImageHandler : IRequestHandler<GetDrawBoardImageRequest, GetDrawBoardImageResponse>
{
    private readonly ISessionDataRepository _sessionDataRepository;

    public GetDrawBoardImageHandler(ISessionDataRepository sessionDataRepository)
    {
        _sessionDataRepository = sessionDataRepository;
    }

    public async Task<GetDrawBoardImageResponse> Handle(GetDrawBoardImageRequest request,
        CancellationToken cancellationToken)
    {
        var base64 = await _sessionDataRepository.GetBase64ById(request.Id);

        return new GetDrawBoardImageResponse { Base64Image = base64 };
    }
}