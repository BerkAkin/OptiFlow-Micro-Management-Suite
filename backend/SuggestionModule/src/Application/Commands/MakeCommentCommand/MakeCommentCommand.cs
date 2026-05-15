using MediatR;
using Microsoft.EntityFrameworkCore;
using SuggestionModule.Application.DTOs;
using SuggestionModule.Infrastructure.Persistence;

namespace SuggestionModule.Application.Commands.MakeCommentCommand
{
    public record MakeCommentCommand(int suggestionId, CreateCommentDto comment, int userId) : IRequest<Unit>;
    public class MakeCommentCommandHandler : IRequestHandler<MakeCommentCommand, Unit>
    {
        private readonly SuggestionDbContext _context;
        public MakeCommentCommandHandler(SuggestionDbContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(MakeCommentCommand command, CancellationToken cancellationToken)
        {
            if (string.IsNullOrWhiteSpace(command.comment.Text))
                throw new ArgumentException("Comment cannot be empty");

            var suggestion = await _context.Suggestions
                .FirstOrDefaultAsync(s => s.Id == command.suggestionId, cancellationToken);

            if (suggestion == null)
            {
                throw new KeyNotFoundException("Suggestion does not exist");
            }

            suggestion.AddComment(command.userId, command.comment.Text);

            await _context.SaveChangesAsync(cancellationToken);
            return Unit.Value;
        }
    }
}
