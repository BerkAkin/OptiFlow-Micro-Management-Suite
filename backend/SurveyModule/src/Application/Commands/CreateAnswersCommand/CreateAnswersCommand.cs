using MediatR;
using Microsoft.EntityFrameworkCore;
using SurveyModule.Application.DTOs;
using SurveyModule.Domain.Entities;
using SurveyModule.Infrastructure.Persistance;

namespace SurveyModule.Application.Commands.AnswerSurveyCommand
{
    public record CreateAnswersCommand(int currentTenant, int currentUser, UserAnswerDto userAnswers) : IRequest<Unit>;
    public class CreateAnswersCommandHandler : IRequestHandler<CreateAnswersCommand, Unit>
    {
        private readonly SurveyDbContext _context;
        public CreateAnswersCommandHandler(SurveyDbContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(CreateAnswersCommand request, CancellationToken cancellationToken)
        {
            bool alreadyAnswered = await _context.UserAnswers
                .AnyAsync(x => x.SurveyId == request.userAnswers.SurveyId &&
                          x.UserId == request.currentUser, cancellationToken);

            if (alreadyAnswered)
                throw new InvalidOperationException("You've already took the survey");

            var survey = await _context.Surveys.FindAsync(request.userAnswers.SurveyId);

            if (survey is null)
                throw new InvalidOperationException("No survey has been found");

            survey.IncreaseSatisfaction();

            var userAnswers = request.userAnswers.Answers
                .Select(ans => new UserAnswer(
                request.currentTenant,
                request.currentUser,
                request.userAnswers.SurveyId,
                ans.QuestionId,
                ans.AnswerId
            )).ToList();

            await _context.UserAnswers.AddRangeAsync(userAnswers, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
