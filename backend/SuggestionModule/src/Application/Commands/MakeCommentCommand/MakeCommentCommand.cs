using MediatR;
using SuggestionModule.Application.DTOs;
using SuggestionModule.Application.Interfaces;
using SuggestionModule.Domain.Entities;

namespace SuggestionModule.Application.Commands.MakeCommentCommand
{
    public record MakeCommentCommand(CreateCommentDto comment,int userId): IRequest<Unit>;
    public class MakeCommentCommandHandler : IRequestHandler<MakeCommentCommand, Unit>
    {
        private readonly ISuggestionRepository _repository;
        public MakeCommentCommandHandler(ISuggestionRepository repository)
        {
            _repository = repository;
        }

        public async Task<Unit> Handle(MakeCommentCommand command, CancellationToken cancellationToken)
        {
            var suggestion = await _repository.GetByIdAsync(command.comment.SuggestionId);

            suggestion.AddComment(command.userId, command.comment.Text);

            await _repository.SaveAsync();
            return Unit.Value;
        }
    }
}
