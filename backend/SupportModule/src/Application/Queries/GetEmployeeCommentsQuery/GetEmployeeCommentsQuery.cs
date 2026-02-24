using MediatR;
using Microsoft.EntityFrameworkCore;
using SupportModule.Application.DTOs;
using SupportModule.Infrastructure.Persistence;

namespace SupportModule.Application.Queries.GetEmployeeCommentsQuery
{
    public record GetEmployeeCommentsQuery(int UserId): IRequest<List<UserCommentDto>>{}
    public class GetEmploteeCommentsQueryHandler: IRequestHandler<GetEmployeeCommentsQuery,List<UserCommentDto>>{

        private readonly SupportDbContext _dbContext;
        public GetEmploteeCommentsQueryHandler(SupportDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<List<UserCommentDto>> Handle(GetEmployeeCommentsQuery query,CancellationToken cancellationToken)
        {
            return await _dbContext.UserComments
              .AsNoTracking()
              .Where(u => u.UserId == query.UserId)
              .Select(uc => new UserCommentDto
              {
                  UserId = uc.UserId,
                  Comment = uc.Comment
              })
              .ToListAsync(cancellationToken);
        }
    }
}
