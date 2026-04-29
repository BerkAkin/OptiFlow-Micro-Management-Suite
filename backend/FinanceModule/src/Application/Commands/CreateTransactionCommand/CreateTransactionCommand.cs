using FinanceModule.DBOperations;
using FinanceModule.DTOs;
using FluentValidation;
using MediatR;

namespace FinanceModule.Services
{
    public record CreateTransactionCommand(TransactionDTO dto,int currentTenant) : IRequest<Unit>;
    public class CreateTransactionCommandHandler: IRequestHandler<CreateTransactionCommand,Unit>
    {
        private readonly FinanceDBContext _context;
        private readonly IValidator<TransactionDTO> _validator;
        public CreateTransactionCommandHandler(FinanceDBContext context, IValidator<TransactionDTO> validator) {
            _validator = validator;
            _context = context;
        }

        public async Task<Unit> Handle(CreateTransactionCommand command, CancellationToken cancellationToken)
        {
            await _validator.ValidateAndThrowAsync(command.dto);
            var tenant = await _context.Tenants.FindAsync(command.currentTenant,cancellationToken);

            if (tenant == null) 
                throw new Exception("Company does not exist");

            tenant.AddTransaction(
                command.dto.Quantity,command.dto.Who,command.dto.Exchange,
                command.dto.Date,command.dto.Description,command.dto.Partly,
                command.dto.Parts,command.dto.Price,command.dto.Income,
                command.dto.Category,command.dto.Invoice
            );

            await _context.SaveChangesAsync(cancellationToken);


            return Unit.Value;
        }

      
    }
}
