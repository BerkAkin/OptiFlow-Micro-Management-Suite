using MediatR;
using SupportModule.Application.DTOs;
using SupportModule.Application.Interfaces;

namespace SupportModule.Application.Queries.GetEmployeeCommentsQuery
{
    public record GetEmployeeCommentsQuery(int UserId): IRequest<List<UserCommentDto>>{}
    public class GetEmploteeCommentsQueryHandler: IRequestHandler<GetEmployeeCommentsQuery,List<UserCommentDto>>{
        private readonly ISupportRepository _supportRepository;
        public GetEmploteeCommentsQueryHandler(ISupportRepository supportRepository)
        {
            _supportRepository = supportRepository;
        }
        public async Task<List<UserCommentDto>> Handle(GetEmployeeCommentsQuery query,CancellationToken cancellationToken)
        {
            var data = await _supportRepository.GetEmployeeComments(query.UserId);
            return data;
        }
    }
}
