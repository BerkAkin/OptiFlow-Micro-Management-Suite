using MediatR;
using Microsoft.EntityFrameworkCore;
using SurveyModule.Application.DTOs;
using SurveyModule.Infrastructure.Persistance;

namespace SurveyModule.Application.Commands.AddSurvey
{
    public record CreateSurveyCommand(SurveyDto survey, int tenantId) : IRequest<Unit>;
    public class CreateSurveyCommandHandler : IRequestHandler<CreateSurveyCommand, Unit>
    {
        private readonly SurveyDbContext _context;
        public CreateSurveyCommandHandler(SurveyDbContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(CreateSurveyCommand command, CancellationToken cancellationToken)
        {

            var tenant = await _context.Tenants.FirstOrDefaultAsync(t => t.Id == command.tenantId, cancellationToken);
            if (tenant == null)
                throw new Exception("Company does not exist");

            var newSurvey = tenant.AddSurvey(command.survey.Title);

            foreach (var question in command.survey.Questions)
            {
                var newQuestion = newSurvey.AddQuestion(question.Title);
                foreach (var answer in question.Answers)
                {
                    newQuestion.AddAnswer(answer.Title);
                }
            }

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
