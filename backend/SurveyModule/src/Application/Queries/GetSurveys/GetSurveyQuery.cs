using MediatR;
using SurveyModule.Application.Interfaces.Repositories;

namespace SurveyModule.Application.Queries.GetSurveys
{
    public record GetSurveyQuery(int TenantId) : IRequest<List<GetSurveyDto>>;
    public class GetSurveyQueryHandler : IRequestHandler<GetSurveyQuery,List<GetSurveyDto>>
    {
        private readonly ISurveyRepository _repository;
        public GetSurveyQueryHandler(ISurveyRepository repository)
        {
            _repository = repository;
        }
        public async Task<List<GetSurveyDto>> Handle(GetSurveyQuery request,CancellationToken cancellationToken) {
            return await _repository.GetSurveyList(request.TenantId);
        }
    }
}
