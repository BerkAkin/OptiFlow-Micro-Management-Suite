using MediatR;
using SuggestionModule.Application.DTOs;
using SuggestionModule.Application.Interfaces;
using SuggestionModule.Domain.Entities;

namespace SuggestionModule.Application.Commands.MakeVoteCommand
{
    public record MakeVoteCommand(CreateVoteDto vote,int userId) : IRequest<Unit>;

    public class MakeVoteCommandHandler : IRequestHandler<MakeVoteCommand, Unit>
    {
        private readonly ISuggestionRepository _repository;
        public MakeVoteCommandHandler(ISuggestionRepository repository)
        {
            _repository = repository;
        }

        public async Task<Unit> Handle(MakeVoteCommand command, CancellationToken cancellationToken) {

            Vote vote = new Vote(
                command.userId,
                command.vote.SuggestionId,
                command.vote.VoteType
            );
            await _repository.MakeVote(vote);
            return Unit.Value;
        }
    }
}
