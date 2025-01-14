using MediatR;
using PicassoOnline.Application.Repositories.InMemory;

namespace PicassoOnline.Application.Features.GetDrawBoardImage;

public class GetDrawBoardImageHandler(IUnitOfWork unitOfWork) : IRequestHandler<GetDrawBoardImageRequest, GetDrawBoardImageResponse>
{
    public async Task<GetDrawBoardImageResponse> Handle(GetDrawBoardImageRequest request,
        CancellationToken cancellationToken)
    {
        var id = Int32.Parse(request.Id);
        var base64 = await unitOfWork.SessionDataRepository.GetBase64ById(id);

        return new GetDrawBoardImageResponse { Base64Image = base64 };
    }
}