using MediatR;
using SupportModule.Application.DTOs;
using SupportModule.Application.Interfaces;

namespace SupportModule.Application.Queries.GetMonthlyRequestCountsQuery
{
    public record GetMonthlyRequestCountsQuery(int tenantId):IRequest<List<MonthlyRequestsCountDto>>;
    
    public class GetMonthlyRequestCountsQueryHandler: IRequestHandler<GetMonthlyRequestCountsQuery, List<MonthlyRequestsCountDto>>
    {
        private readonly ISupportRepository _supportRepository;
        public GetMonthlyRequestCountsQueryHandler(ISupportRepository supportRepository)
        {
            _supportRepository = supportRepository;
        }

        public async Task<List<MonthlyRequestsCountDto>> Handle(GetMonthlyRequestCountsQuery query, CancellationToken token)
        {
            var data = await _supportRepository.GetMonthlyRequestCountsQuery(query.tenantId);
            return data;
        }
    }
}
