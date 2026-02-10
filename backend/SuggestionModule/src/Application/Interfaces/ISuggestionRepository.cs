using SuggestionModule.Application.DTOs;
using SuggestionModule.Domain.Entities;
using SuggestionModule.Domain.Enums;

namespace SuggestionModule.Application.Interfaces
{
    public interface ISuggestionRepository
    {
        Task<List<SuggestionDto>> GetSuggestions(int tenantId);
        Task<MostSuggestionsDto> GetBestSuggestions(int tenantId);
        Task MakeVote(Vote vote);
        Task MakeSuggestion(Suggestion suggestion);
        Task<Suggestion?> GetByIdAsync(int id);
        Task SaveAsync();
    }
}
