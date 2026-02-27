using MediatR;
using Microsoft.EntityFrameworkCore;
using SupportModule.Application.DTOs;
using SupportModule.Infrastructure.Persistence;

namespace SupportModule.Application.Queries.GetSupportMessagesQuery
{
    public record GetSupportMessagesQuery(int RequestId,int currentUser):IRequest<List<GetSupportMessagesDto>>;

    public class GetSupportMessagesQueryHandler : IRequestHandler<GetSupportMessagesQuery,List<GetSupportMessagesDto>>
    {

        private readonly SupportDbContext _dbContext;
        public GetSupportMessagesQueryHandler(SupportDbContext dbContext) {
            _dbContext = dbContext;
        }
        
        public async Task<List<GetSupportMessagesDto>> Handle(GetSupportMessagesQuery query, CancellationToken cancellationToken)
        {
           return await _dbContext.SupportMessages
                .AsNoTracking()
                .Where(sm => sm.SupportRequestId == query.RequestId)
                .Select(sm => new GetSupportMessagesDto
                {
                    Message = sm.Message,
                    CreatedAt = sm.CreatedAt,
                    IsMine= sm.SenderId == query.currentUser
                })
                .OrderBy(sm => sm.CreatedAt)
                .ToListAsync(cancellationToken);

        }
    }
}
