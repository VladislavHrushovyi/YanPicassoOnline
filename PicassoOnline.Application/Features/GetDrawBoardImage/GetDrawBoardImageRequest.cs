using FluentValidation;
using MediatR;

namespace PicassoOnline.Application.Features.GetDrawBoardImage;

public sealed record GetDrawBoardImageRequest(string Id) : IRequest<GetDrawBoardImageResponse>;

internal sealed class GetDrawBoardImageRequestValidator : AbstractValidator<GetDrawBoardImageRequest>
{
    public GetDrawBoardImageRequestValidator()
    {
        RuleFor(x => x.Id)
            .NotNull().WithMessage("Id cannot be null.")
            .NotEmpty().WithMessage("Id cannot be empty.")
            .Must(StringMustBeInteger);
    }

    private bool StringMustBeInteger(string id)
    {
        return Int32.TryParse(id, out _);
    }
}