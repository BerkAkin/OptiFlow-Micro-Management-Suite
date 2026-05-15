using MediatR;
using Microsoft.EntityFrameworkCore;
using SuggestionModule.Application.DTOs;
using SuggestionModule.Infrastructure.Persistence;

namespace SuggestionModule.Application.Queries.GetSuggestionsQuery
{
    public record GetMySuggestionsQuery(int tenantId, int userId) : IRequest<List<SuggestionDto>>;
    public class GetMySuggestionsQueryHandler : IRequestHandler<GetMySuggestionsQuery, List<SuggestionDto>>
    {

        private readonly SuggestionDbContext _context;
        public GetMySuggestionsQueryHandler(SuggestionDbContext context)
        {
            _context = context;
        }
        public async Task<List<SuggestionDto>> Handle(GetMySuggestionsQuery request, CancellationToken cancellationToken)
        {
            var data = await _context.Suggestions
                .AsNoTracking()
                .Where(x => x.TenantId == request.tenantId && x.UserId == request.userId)
                .Select(suggestion => new SuggestionDto
                {
                    Id = suggestion.Id,
                    Description = suggestion.Description,
                    Title = suggestion.Title,
                    Status = suggestion.Status,
                    Date = suggestion.Date,
                    Votes = suggestion.Votes.Sum(v => (int)v.VoteType),
                    Comments = suggestion.Comments
                        .Select(comment => new CommentDto
                        {
                            Id = comment.Id,
                            Text = comment.Text,
                        })
                        .ToList(),
                })
                .ToListAsync();

            return data;
        }
    }
}
