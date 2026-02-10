using MediatR;
using SurveyModule.Application.DTOs;
using SurveyModule.Application.Interfaces.Repositories;
using SurveyModule.Domain.Entities;

namespace SurveyModule.Application.Commands.AnswerSurveyCommand
{
    public record AnswerSurveyCommand(UserAnswerDto UserAnswer,int userId): IRequest<Unit>;
    public class AnswerSurveyCommandHandler : IRequestHandler<AnswerSurveyCommand,Unit>
    {
        private readonly ISurveyRepository _surveyRepository;
        public AnswerSurveyCommandHandler(ISurveyRepository surveyRepository)
        {
            _surveyRepository = surveyRepository;
        }

        public async Task<Unit> Handle(AnswerSurveyCommand request, CancellationToken cancellationToken)
        {
            var entites = request.UserAnswer.Answers.Select(a => new UserAnswer
            {
                UserId = request.userId,
                SurveyId = request.UserAnswer.SurveyId,
                AnswerId = a.AnswerId,
                QuestionId = a.QuestionId,
                CreatedAt = DateTime.Now,
            }).ToList();

            await _surveyRepository.AnswerSurvey(entites);
            return Unit.Value;
        }
    }
}
