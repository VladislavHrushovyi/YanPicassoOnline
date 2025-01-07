using FluentValidation;
using MediatR;

namespace PicassoOnline.Application.Features.InitSessionData;

public class InitSessionDataRequest : IRequest<InitSessionDataResponse>
{
    public string Name { get; set; }
}

public sealed class InitSessionDataResponse
{
    public int Id { get; set; }
}

public sealed class InitSessionDataValidator : AbstractValidator<InitSessionDataRequest>
{
    public InitSessionDataValidator()
    {
        RuleFor(x => x.Name)
            .NotNull().WithMessage("Name is required")
            .NotEmpty().WithMessage("Name must not be empty");
    }
}