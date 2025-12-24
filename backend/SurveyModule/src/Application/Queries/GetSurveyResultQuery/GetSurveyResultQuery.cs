using MediatR;
using SurveyModule.Application.DTOs;
using SurveyModule.Application.Interfaces.Repositories;

namespace SurveyModule.Application.Queries.GetSurveyResult
{
    public record GetSurveyResultQuery(int SurveyId) : IRequest<SurveyResultDto>;
    public class GetSurveyResultQueryHandler : IRequestHandler<GetSurveyResultQuery, SurveyResultDto>
    {
        private readonly ISurveyRepository _repository;
        public GetSurveyResultQueryHandler(ISurveyRepository repository)
        {
            _repository = repository;
        }
        
        public async Task<SurveyResultDto> Handle(GetSurveyResultQuery request,CancellationToken cancellationToken) { 
               return await _repository.GetSurveyResult(request.SurveyId);
        }
    }
}
