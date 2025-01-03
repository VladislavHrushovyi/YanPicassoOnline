using MediatR;

namespace PicassoOnline.Application.Features.GetDrawBoardImage;

public sealed record GetDrawBoardImageRequest(int Id) : IRequest<GetDrawBoardImageResponse>;