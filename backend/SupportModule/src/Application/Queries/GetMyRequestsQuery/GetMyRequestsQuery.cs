using MediatR;
using SupportModule.Application.DTOs;
using SupportModule.Application.Interfaces;

namespace SupportModule.Application.Queries.GetMyRequestsQuery
{
    public record GetMyRequestsQuery(int UserId) : IRequest<List<SupportRequestsDto>>;
    public class GetMyRequestsQueryHandler : IRequestHandler<GetMyRequestsQuery,List<SupportRequestsDto>>
    {
        private readonly ISupportRepository _supportRepository;
        public GetMyRequestsQueryHandler(ISupportRepository supportRepository)
        {
            _supportRepository = supportRepository;
        }

        public async Task<List<SupportRequestsDto>> Handle(GetMyRequestsQuery query,CancellationToken cancellationToken) 
        {
            var data = await  _supportRepository.GetMyRequest(query.UserId);
            return data;
        }
    }
}
