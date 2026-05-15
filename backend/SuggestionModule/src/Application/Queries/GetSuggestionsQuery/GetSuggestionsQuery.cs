using MediatR;
using Microsoft.EntityFrameworkCore;
using SuggestionModule.Application.DTOs;
using SuggestionModule.Infrastructure.Persistence;

namespace SuggestionModule.Application.Queries.GetSuggestionsQuery
{
    public record GetSuggestionsQuery(int tenantId) : IRequest<List<SuggestionDto>>;
    public class GetSuggestionsQueryHandler : IRequestHandler<GetSuggestionsQuery, List<SuggestionDto>>
    {

        private readonly SuggestionDbContext _context;
        public GetSuggestionsQueryHandler(SuggestionDbContext context)
        {
            _context = context;
        }
        public async Task<List<SuggestionDto>> Handle(GetSuggestionsQuery request, CancellationToken cancellationToken)
        {

            var data = await _context.Suggestions
                .AsNoTracking()
                .Where(x => x.TenantId == request.tenantId)
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
