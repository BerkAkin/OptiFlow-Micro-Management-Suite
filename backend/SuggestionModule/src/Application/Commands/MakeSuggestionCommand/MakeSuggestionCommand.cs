using MediatR;
using SuggestionModule.Application.DTOs;
using SuggestionModule.Application.Interfaces;
using SuggestionModule.Domain.Entities;

namespace SuggestionModule.Application.Commands.MakeSuggestionCommand
{


        public record MakeSuggestionCommand(CreateSuggestionDto suggestion,int tenantId,int userId) : IRequest<Unit>;
        public class MakeSuggestionCommandHandler : IRequestHandler<MakeSuggestionCommand, Unit>
        {
            private readonly ISuggestionRepository _repository;
            public MakeSuggestionCommandHandler(ISuggestionRepository repository)
            {
                _repository = repository;
            }

            public async Task<Unit> Handle(MakeSuggestionCommand command, CancellationToken cancellationToken)
            {
            Suggestion suggestion = new Suggestion(
                command.suggestion.Title,    
                command.suggestion.Description,
                command.userId,
                command.tenantId
            );
                await _repository.MakeSuggestion(suggestion);
                return Unit.Value;
            }
        }
    

}
