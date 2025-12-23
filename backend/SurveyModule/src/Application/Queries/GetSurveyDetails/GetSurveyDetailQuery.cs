using MediatR;
using SurveyModule.Application.Interfaces.Repositories;

namespace SurveyModule.Application.Queries.GetSurveyDetails
{
    public record GetSurveyDetailQuery(int SurveyId) : IRequest<GetSurveyDetailDto>;
    public class GetSurveyDetailHandler: IRequestHandler<GetSurveyDetailQuery, GetSurveyDetailDto>
    {
        private readonly ISurveyRepository _repository;
        public GetSurveyDetailHandler(ISurveyRepository repository)
        {
            _repository = repository;
        }

        public async Task<GetSurveyDetailDto> Handle(GetSurveyDetailQuery request, CancellationToken cancellationToken)
        {
            return await _repository.GetSurveyDetail(request.SurveyId);
        }
    }
}
