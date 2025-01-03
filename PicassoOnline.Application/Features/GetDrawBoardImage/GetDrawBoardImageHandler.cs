using MediatR;

namespace PicassoOnline.Application.Features.GetDrawBoardImage;

public class GetDrawBoardImageHandler : IRequestHandler<GetDrawBoardImageRequest, GetDrawBoardImageResponse>
{
    public Task<GetDrawBoardImageResponse> Handle(GetDrawBoardImageRequest request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}