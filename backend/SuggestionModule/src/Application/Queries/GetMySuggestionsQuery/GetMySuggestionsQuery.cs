using MediatR;
using SuggestionModule.Application.DTOs;
using SuggestionModule.Application.Interfaces;

namespace SuggestionModule.Application.Queries.GetSuggestionsQuery
{
    public record GetMySuggestionsQuery(int tenantId,int userId) : IRequest<List<SuggestionDto>>;
    public class GetMySuggestionsQueryHandler : IRequestHandler<GetMySuggestionsQuery, List<SuggestionDto>>
    {

        private readonly ISuggestionRepository _repository;
        public GetMySuggestionsQueryHandler(ISuggestionRepository repository)
        {
            _repository = repository;
        }
        public async Task<List<SuggestionDto>> Handle(GetMySuggestionsQuery request, CancellationToken cancellationToken)
        {
            var data = await _repository.GetMySuggestions(request.tenantId,request.userId);
            return data;
        }
    }
}
