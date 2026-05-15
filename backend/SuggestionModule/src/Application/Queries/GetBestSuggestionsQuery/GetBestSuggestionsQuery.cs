using MediatR;
using Microsoft.EntityFrameworkCore;
using SuggestionModule.Application.DTOs;
using SuggestionModule.Infrastructure.Persistence;

namespace SuggestionModule.Application.Queries.GetBestSuggestionsQuery
{
    public record GetBestSuggestionsQuery(int tenantId) : IRequest<MostSuggestionsDto>;
    public class GetBestSuggestionsQueryHandler : IRequestHandler<GetBestSuggestionsQuery, MostSuggestionsDto>
    {
        private readonly SuggestionDbContext _context;
        public GetBestSuggestionsQueryHandler(SuggestionDbContext context)
        {
            _context = context;
        }

        public async Task<MostSuggestionsDto> Handle(GetBestSuggestionsQuery request, CancellationToken cancellationToken)
        {
            var now = DateTime.UtcNow;
            var startOfMonth = new DateTime(now.Year, now.Month, 1);
            var startOfNextMonth = startOfMonth.AddMonths(1);


            var best = await _context.Suggestions
                .AsNoTracking()
                .Where(x => x.TenantId == request.tenantId)
                .Select(x => new BestSuggestionAllTimes
                {
                    Description = x.Description,
                    Votes = x.Votes.Count()
                })
                .OrderByDescending(x => x.Votes)
                .FirstOrDefaultAsync();

            var month = await _context.Suggestions
                .AsNoTracking()
                .Where(x => x.TenantId == request.tenantId && x.Date >= startOfMonth && x.Date < startOfNextMonth)
                .Select(x => new BestSuggestionAllTimes
                {
                    Description = x.Description,
                    Votes = x.Votes.Count()
                })
                .OrderByDescending(x => x.Votes)
                .FirstOrDefaultAsync();


            return new MostSuggestionsDto
            {
                Best = best,
                Month = month,
            };

        }
    }
}
