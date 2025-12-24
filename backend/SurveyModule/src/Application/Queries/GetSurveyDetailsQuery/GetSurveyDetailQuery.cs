using MediatR;
using SurveyModule.Application.DTOs;
using SurveyModule.Application.Interfaces.Repositories;

namespace SurveyModule.Application.Queries.GetSurveyDetailsQuery
{
    public record GetSurveyDetailQuery(int SurveyId) : IRequest<SurveyDto>;
    public class GetSurveyDetailHandler: IRequestHandler<GetSurveyDetailQuery, SurveyDto>
    {
        private readonly ISurveyRepository _repository;
        public GetSurveyDetailHandler(ISurveyRepository repository)
        {
            _repository = repository;
        }

        public async Task<SurveyDto> Handle(GetSurveyDetailQuery request, CancellationToken cancellationToken)
        {
            return await _repository.GetSurveyDetail(request.SurveyId);
        }
    }
}
