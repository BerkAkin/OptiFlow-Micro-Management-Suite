using MediatR;
using SuggestionModule.Application.DTOs;
using SuggestionModule.Infrastructure.Persistence;

namespace SuggestionModule.Application.Commands.MakeSuggestionCommand
{


    public record MakeSuggestionCommand(CreateSuggestionDto suggestion, int tenantId, int userId) : IRequest<Unit>;
    public class MakeSuggestionCommandHandler : IRequestHandler<MakeSuggestionCommand, Unit>
    {
        private readonly SuggestionDbContext _context;
        public MakeSuggestionCommandHandler(SuggestionDbContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(MakeSuggestionCommand command, CancellationToken cancellationToken)
        {

            var tenant = await _context.Tenants.FindAsync(command.tenantId, cancellationToken);

            if (tenant is null)
                throw new KeyNotFoundException("Company does not exist");

            tenant.AddSuggestion(command.suggestion.Title, command.suggestion.Description, command.userId);

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }


}
