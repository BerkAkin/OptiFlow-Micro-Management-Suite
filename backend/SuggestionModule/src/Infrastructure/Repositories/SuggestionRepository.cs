using Microsoft.EntityFrameworkCore;
using SuggestionModule.Application.DTOs;
using SuggestionModule.Application.Interfaces;
using SuggestionModule.Domain.Entities;
using SuggestionModule.Domain.Enums;
using SuggestionModule.Infrastructure.Persistence;

namespace SuggestionModule.Infrastructure.Repositories
{
    public class SuggestionRepository: ISuggestionRepository
    {
        private readonly SuggestionDbContext _context;
        public SuggestionRepository(SuggestionDbContext context) {
            _context = context;
        }

        public async Task<List<SuggestionDto>> GetSuggestions(int tenantId)
        {
            var data = await _context.Suggestions
                .AsNoTracking()
                .Where(x => x.TenantId == tenantId)
                .Select(suggestion => new SuggestionDto
                {
                    Id = suggestion.Id,
                    Description = suggestion.Description,
                    Title = suggestion.Title,
                    Status = suggestion.Status,
                    Date = suggestion.Date,
                    Votes = suggestion.Votes.Sum(v => (int)v.VoteType),
                    Comments = suggestion.Comments
                        .Select(comment=> new CommentDto
                        {
                           Id= comment.Id,
                           Text= comment.Text,
                        })
                        .ToList(),
                })
                .ToListAsync();

            return data;
        }

        public async Task<MostSuggestionsDto> GetBestSuggestions(int tenantId) {

            var now = DateTime.UtcNow; 
            var startOfMonth = new DateTime(now.Year, now.Month, 1);
            var startOfNextMonth = startOfMonth.AddMonths(1);

            var result = await _context.Suggestions
                .AsNoTracking()
                .Where(x => x.TenantId == tenantId)
                .GroupBy(_ => 1)
                .Select(group => new MostSuggestionsDto
                {
                    thisMonth = group
                        .Where(x => x.Date >= startOfMonth && x.Date < startOfNextMonth)
                        .OrderByDescending(x => x.Votes.Count())
                        .Select(suggestion => new  BestSuggestionThisMonthDto
                        {
                            Description = suggestion.Description,
                            Votes = suggestion.Votes.Count()
                        }).FirstOrDefault() ?? new BestSuggestionThisMonthDto { Description = "", Votes = 0 },

                    Best = group
                        .OrderByDescending(x => x.Votes.Count())
                        .Select(suggestion => new BestSuggestionAllTimes
                        {
                            Description = suggestion.Description,
                            Votes = suggestion.Votes.Count(),
                        }).FirstOrDefault() ?? new BestSuggestionAllTimes { Description="",Votes=0 }
                })
                .FirstOrDefaultAsync();

            return result ?? new MostSuggestionsDto();
        }


        public async Task MakeVote(Vote vote)
        {
            var existingVote = await _context.Votes.FirstOrDefaultAsync(x => x.UserId == vote.UserId && x.SuggestionId == vote.SuggestionId);
            if (existingVote is null) {
                await _context.Votes.AddAsync(vote);
            }
            else
            {
                existingVote.ChangeVote(vote.VoteType);
            }
            await _context.SaveChangesAsync();
        }

        public async Task MakeSuggestion(Suggestion suggestion)
        {
            await _context.Suggestions.AddAsync(suggestion);
            await _context.SaveChangesAsync();
        }

        public async Task<Suggestion?> GetByIdAsync(int id)
        {
            return await _context.Suggestions
                .Include(x => x.Comments)
                .FirstOrDefaultAsync(x => x.Id == id);
        }


        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }

    }
}
