using MediatR;
using SuggestionModule.Application.DTOs;
using SuggestionModule.Application.Interfaces;

namespace SuggestionModule.Application.Queries.GetSuggestionsQuery
{
    public record GetSuggestionsQuery(int tenantId) : IRequest<List<SuggestionDto>>;
    public class GetSuggestionsQueryHandler : IRequestHandler<GetSuggestionsQuery, List<SuggestionDto>> {

        private readonly ISuggestionRepository _repository;
        public GetSuggestionsQueryHandler(ISuggestionRepository repository) { 
            _repository = repository;
        } 
        public async Task<List<SuggestionDto>> Handle(GetSuggestionsQuery request,CancellationToken cancellationToken){
            var data = await _repository.GetSuggestions(request.tenantId);
            return data;
        }
    }
}
