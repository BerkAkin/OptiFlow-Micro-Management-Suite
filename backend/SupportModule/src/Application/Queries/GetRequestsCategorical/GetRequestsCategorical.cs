using MediatR;
using SupportModule.Application.DTOs;
using SupportModule.Application.Interfaces;

namespace SupportModule.Application.Queries.GetRequestsCategorical
{
    public record GetRequestsCategoricalQuery(int TenantId): IRequest<List<CategoricalRequestDto>>;
    public class GetRequestsCategoricalHandler : IRequestHandler<GetRequestsCategoricalQuery, List<CategoricalRequestDto>>
    {
        private readonly ISupportRepository _supportRepository;
        public GetRequestsCategoricalHandler(ISupportRepository supportRepository) { 

            _supportRepository = supportRepository;
        }

        public async Task<List<CategoricalRequestDto>> Handle(GetRequestsCategoricalQuery request, CancellationToken cancellationToken)
        {
            var data = await _supportRepository.GetRequestsCategorical(request.TenantId);
            return data;
        }
    }
}
