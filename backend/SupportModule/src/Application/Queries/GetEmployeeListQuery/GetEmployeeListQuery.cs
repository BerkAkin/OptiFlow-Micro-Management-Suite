using MediatR;
using SupportModule.Application.DTOs;
using SupportModule.Application.Interfaces;

namespace SupportModule.Application.Queries.GetEmployeeListQuery
{
    public record GetEmployeeListQuery(int tenantId):IRequest<List<EmployeeDto>>;
        public class GetEmployeeListQueryHandler : IRequestHandler<GetEmployeeListQuery, List<EmployeeDto>>
    {
        private readonly ISupportRepository _supportRepository;
        public GetEmployeeListQueryHandler(ISupportRepository supportRepository)
        {
            _supportRepository = supportRepository;
        }
        public async Task<List<EmployeeDto>> Handle(GetEmployeeListQuery query,CancellationToken cancellationToken)
        {
            var data = await _supportRepository.GetEmployeeListQuery(query.tenantId);
            return data;
        }
    }
}
