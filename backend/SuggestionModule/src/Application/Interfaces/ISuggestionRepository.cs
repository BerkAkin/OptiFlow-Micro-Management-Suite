using SuggestionModule.Application.DTOs;
using SuggestionModule.Domain.Entities;

namespace SuggestionModule.Application.Interfaces
{
    public interface ISuggestionRepository
    {
        Task<List<SuggestionDto>> GetSuggestions(int tenantId);
        Task<List<SuggestionDto>> GetMySuggestions(int tenantId,int userId);
        Task<MostSuggestionsDto> GetBestSuggestions(int tenantId);
        Task MakeVote(Vote vote);
        Task MakeSuggestion(Suggestion suggestion);
        Task<Suggestion?> GetByIdAsync(int id);
        Task SaveAsync();
    }
}
