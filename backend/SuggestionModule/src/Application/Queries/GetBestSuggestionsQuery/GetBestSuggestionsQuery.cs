using MediatR;
using SuggestionModule.Application.DTOs;
using SuggestionModule.Application.Interfaces;

namespace SuggestionModule.Application.Queries.GetBestSuggestionsQuery
{
    public record GetBestSuggestionsQuery(int tenantId) : IRequest<MostSuggestionsDto>;
    public class GetBestSuggestionsQueryHandler : IRequestHandler<GetBestSuggestionsQuery, MostSuggestionsDto>
    {
        private readonly ISuggestionRepository _suggestionRepository;
        public GetBestSuggestionsQueryHandler(ISuggestionRepository suggestionRepository) { 
            _suggestionRepository = suggestionRepository;
        }

        public async Task<MostSuggestionsDto> Handle(GetBestSuggestionsQuery request, CancellationToken cancellationToken) {
            var data = await _suggestionRepository.GetBestSuggestions(request.tenantId);
            return data;
        }
    }
}
