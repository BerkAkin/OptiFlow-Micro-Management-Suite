using MediatR;
using Microsoft.EntityFrameworkCore;
using SuggestionModule.Application.DTOs;
using SuggestionModule.Domain.Entities;
using SuggestionModule.Infrastructure.Persistence;

namespace SuggestionModule.Application.Commands.MakeVoteCommand
{
    public record MakeVoteCommand(int suggestionId, CreateVoteDto vote, int userId) : IRequest<Unit>;

    public class MakeVoteCommandHandler : IRequestHandler<MakeVoteCommand, Unit>
    {
        private readonly SuggestionDbContext _context;
        public MakeVoteCommandHandler(SuggestionDbContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(MakeVoteCommand command, CancellationToken cancellationToken)
        {


            Suggestion suggestion = await _context.Suggestions
                .Where(s => s.Id == command.suggestionId)
                .FirstOrDefaultAsync(cancellationToken);

            if (suggestion == null)
                throw new KeyNotFoundException("Suggestion does not exist");

            var existingVote = await _context.Votes
                .FirstOrDefaultAsync(x => x.UserId == command.userId && x.SuggestionId == suggestion.Id);


            if (existingVote == null)
            {
                suggestion.AddVote(command.userId, command.vote.VoteType);
            }
            else
            {
                if (existingVote.VoteType != command.vote.VoteType)
                {
                    existingVote.ChangeVote(command.vote.VoteType);
                }
                else
                {
                    return Unit.Value;
                }
            }

            await _context.SaveChangesAsync(cancellationToken);
            return Unit.Value;
        }
    }
}
