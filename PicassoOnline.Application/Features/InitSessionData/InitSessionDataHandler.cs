using MediatR;
using PicassoOnline.Application.Repositories.InMemory;

namespace PicassoOnline.Application.Features.InitSessionData;

public sealed class InitSessionDataHandler(IUnitOfWork unitOfWork) : IRequestHandler<InitSessionDataRequest, InitSessionDataResponse>
{
    public async Task<InitSessionDataResponse> Handle(InitSessionDataRequest request, CancellationToken cancellationToken)
    {
        var result = await unitOfWork.SessionDataRepository.InitNewData(request.Name);

        return new InitSessionDataResponse() { Id = result };
    }
}