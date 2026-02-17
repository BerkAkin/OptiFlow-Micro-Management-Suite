using MediatR;
using SupportModule.Application.DTOs;
using SupportModule.Application.Interfaces;

namespace SupportModule.Application.Queries.GetSupportRequestsQuery
{
    public record GetSupportRequestsQuery(int TenantId):IRequest<List<SupportRequestsDto>>;
    
    public class GetSupportRequestsQueryHandler: IRequestHandler<GetSupportRequestsQuery , List<SupportRequestsDto>>
    {
        private readonly ISupportRepository _supportRepository;
        public GetSupportRequestsQueryHandler(ISupportRepository supportRepository)
        {
            _supportRepository = supportRepository;
        }

        public async Task<List<SupportRequestsDto>> Handle(GetSupportRequestsQuery query, CancellationToken cancellationToken)
        {
            return await _supportRepository.GetSupportRequests(query.TenantId);
        }

      
    }
}
