using System.Text.RegularExpressions;
using FluentValidation;
using MediatR;

namespace PicassoOnline.Application.Features.UpdateDrawBoardBase64;

public class DrawBoardStateRequest : IRequest<DrawBoardStateResponse>
{
    public int DetailInfoId { get; set; }
    public string Base64 { get; set; }
}

internal sealed class DrawBoardStateRequestValidator : AbstractValidator<DrawBoardStateRequest>
{
    private static readonly Regex Base64Match = new Regex("\"^[a-zA-Z0-9\\+/]*={0,2}$\"", RegexOptions.Compiled);

    public DrawBoardStateRequestValidator()
    {
        RuleFor(x => x.DetailInfoId)
            .NotNull().WithMessage("{PropertyName} is required")
            .NotEmpty().WithMessage("{PropertyName} could not be empty");
        
        RuleFor(x => x.Base64)
            .NotEmpty().WithMessage("{PropertyName} is required")
            .NotNull().WithMessage("{PropertyName} is could not be empty")
            .Matches(Base64Match).WithMessage("{PropertyName} is not a valid Base64 string");
    }
}