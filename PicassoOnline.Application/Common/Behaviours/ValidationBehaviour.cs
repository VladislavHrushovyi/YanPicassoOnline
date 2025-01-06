using FluentValidation;
using MediatR;
using PicassoOnline.Application.Common.Exceptions;

namespace PicassoOnline.Application.Common.Behaviours;

public class ValidationBehaviour<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse> where TRequest : IRequest<TResponse>
{
    private readonly IEnumerable<IValidator<TRequest>> _validators;

    public ValidationBehaviour(IEnumerable<IValidator<TRequest>> validators)
    {
        _validators = validators;
    }

    public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
    {
        if (!_validators.Any())
        {
            return await next();
        }
        
        var validationContext = new ValidationContext<TRequest>(request);

        var error = _validators
            .Select(validator => validator.Validate(validationContext))
            .SelectMany(result => result.Errors)
            .Where(x => x != null)
            .Select(x => x.ErrorMessage)
            .ToArray();

        if (error.Any())
        {
            throw new BadModelRequestException(error);
        }
        
        return await next();
    }
}