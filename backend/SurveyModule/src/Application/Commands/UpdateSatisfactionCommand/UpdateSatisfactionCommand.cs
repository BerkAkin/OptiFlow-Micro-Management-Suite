using MediatR;
using Microsoft.EntityFrameworkCore;
using SurveyModule.Infrastructure.Persistance;

namespace SurveyModule.Application.Commands.UpdateSatisfactionCommand
{

    public record UpdateSatisfactionCommand(int surveyId, int currentTenant) : IRequest<Unit>;
    public class UpdateSatisfactionCommandHandler : IRequestHandler<UpdateSatisfactionCommand, Unit>
    {
        private readonly SurveyDbContext _context;
        public UpdateSatisfactionCommandHandler(SurveyDbContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(UpdateSatisfactionCommand request, CancellationToken cancellationToken)
        {


            var survey = await _context.Surveys.FirstOrDefaultAsync(s => s.Id == request.surveyId && s.TenantId == request.currentTenant, cancellationToken);

            if (survey is null)
                throw new KeyNotFoundException("No survey has been found");

            survey.IncreaseSatisfaction();
            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }

}