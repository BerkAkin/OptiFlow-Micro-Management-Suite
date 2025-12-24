using MediatR;
using SurveyModule.Application.DTOs;
using SurveyModule.Application.Interfaces.Repositories;
using SurveyModule.Domain.Entities;

namespace SurveyModule.Application.Commands.AddSurvey
{
    public record AddSurveyCommand(SurveyDto survey) : IRequest<Unit>;
    public class AddSurveyCommandHandler : IRequestHandler<AddSurveyCommand ,Unit>
    {
        private readonly ISurveyRepository _repository;
        public AddSurveyCommandHandler(ISurveyRepository repository)
        {
            _repository = repository;
        }

        public async Task<Unit> Handle(AddSurveyCommand command, CancellationToken cancellationToken) {


            Survey surv = new Survey()
            {
                Title = command.survey.Title,
                Questions = command.survey.Questions.Select(q => new Question
                {
                    Title = q.Title,
                    Answers = q.Answers.Select(a => new Answer
                    {
                        Title = a.Title,
                    }).ToList(),
                }).ToList(),
            };

            await _repository.AddSurvey(surv);
            return Unit.Value;
        }
    }
}
