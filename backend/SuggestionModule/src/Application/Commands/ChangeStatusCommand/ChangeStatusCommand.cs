using MediatR;
using Microsoft.EntityFrameworkCore;
using SuggestionModule.Application.DTOs;
using SuggestionModule.Domain.Enums;
using SuggestionModule.Infrastructure.Persistence;

namespace SuggestionModule.Application.Commands.ChangeStatusCommand
{
    public record ChangeStatusCommand(int suggestionId, StatusDto status) : IRequest<Unit>;
    public class ChangeStatusCommandHandler : IRequestHandler<ChangeStatusCommand, Unit>
    {
        private readonly SuggestionDbContext _context;
        public ChangeStatusCommandHandler(SuggestionDbContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(ChangeStatusCommand command, CancellationToken cancellationToken)
        {
            var suggestion = await _context.Suggestions
                .FirstOrDefaultAsync(x => x.Id == command.suggestionId, cancellationToken);

            if (suggestion == null)
            {
                throw new KeyNotFoundException("Suggestion does not exist");
            }


            if (!Enum.TryParse<SuggestionStatus>(command.status.Status.ToString(), out var newStatus))
            {
                throw new ArgumentException("Invalid status value");
            }

            if (suggestion.Status == newStatus)
            {
                return Unit.Value;
            }

            suggestion.ChangeStatus(newStatus);

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }

}
