using FinanceModule.DTOs;
using FluentValidation;

namespace FinanceModule.Validators
{
    public class AddTransactionValidator : AbstractValidator<TransactionDTO>
    {
        public AddTransactionValidator() {
            RuleFor(x => x.Category).NotEmpty();
            RuleFor(x => x.Description).NotEmpty().MaximumLength(100).MinimumLength(5);
            RuleFor(x => x.Who).NotEmpty().MaximumLength(30).MinimumLength(1);
            RuleFor(x => x.Quantity).NotEmpty().InclusiveBetween(1,100000);
            RuleFor(x => x.Parts).NotEmpty();
            RuleFor(x=>x.Price).NotEmpty().GreaterThan(0);
            RuleFor(x=>x.Exchange).NotEmpty();
            RuleFor(x => x.Date).NotEmpty();
        }
    }
}
