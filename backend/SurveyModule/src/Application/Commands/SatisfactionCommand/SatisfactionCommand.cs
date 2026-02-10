using MediatR;
using SurveyModule.Application.DTOs;
using SurveyModule.Application.Interfaces.Repositories;
using SurveyModule.Domain.Entities;

namespace SurveyModule.Application.Commands.SatisfactionCommand
{
    public record SatisfactionCommand(SatisfactionRateDto satisfaction,int UserId) : IRequest<Unit>;
    public class SatisfactionCommandHandler: IRequestHandler<SatisfactionCommand,Unit>
    {
        private readonly ISurveyRepository _repository;
        public SatisfactionCommandHandler(ISurveyRepository repository)
        {
            _repository = repository;
        }

        public async Task<Unit> Handle(SatisfactionCommand command, CancellationToken cancellationToken)
        {
            var satisfaction = new SatisfactionRate
            {
                UserId= command.UserId,
                Satisfaction = command.satisfaction.Satisfaction,
                SurveyId = command.satisfaction.SurveyId,
            };


            await _repository.AddSatisfaction(satisfaction);
            return Unit.Value;
        }
    }
}
