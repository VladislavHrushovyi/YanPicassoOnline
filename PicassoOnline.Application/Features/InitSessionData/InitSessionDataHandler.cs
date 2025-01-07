using MediatR;
using PicassoOnline.Application.Repositories.InMemory;

namespace PicassoOnline.Application.Features.InitSessionData;

public sealed class InitSessionDataHandler : IRequestHandler<InitSessionDataRequest, InitSessionDataResponse>
{
    private readonly ISessionDataRepository _sessionDataRepository;

    public InitSessionDataHandler(ISessionDataRepository sessionDataRepository)
    {
        _sessionDataRepository = sessionDataRepository;
    }

    public async Task<InitSessionDataResponse> Handle(InitSessionDataRequest request, CancellationToken cancellationToken)
    {
        var result = await _sessionDataRepository.InitNewData(request.Name);

        return new InitSessionDataResponse() { Id = result };
    }
}