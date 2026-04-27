using MediatR;
using SuggestionModule.Application.DTOs;
using SuggestionModule.Application.Interfaces;
using SuggestionModule.Domain.Entities;

namespace SuggestionModule.Application.Commands.ChangeStatusCommand
{
    public record ChangeStatusCommand(int suggestionId, StatusDto status) : IRequest<Unit>;
    public class ChangeStatusCommandHandler : IRequestHandler<ChangeStatusCommand, Unit>
    {
        private readonly ISuggestionRepository _repository;
        public ChangeStatusCommandHandler(ISuggestionRepository repository)
        {
            _repository = repository;
        }

        public async Task<Unit> Handle(ChangeStatusCommand command, CancellationToken cancellationToken)
        {
            var suggestion = await _repository.GetByIdAsync(command.suggestionId);
            suggestion.ChangeStatus(command.status.Status);
            await _repository.SaveAsync();
            return Unit.Value;
        }
    }

}
