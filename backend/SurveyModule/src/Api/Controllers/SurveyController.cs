using MediatR;
using Microsoft.AspNetCore.Mvc;
using SurveyModule.Application.Commands.AddSurvey;
using SurveyModule.Application.Commands.AnswerSurveyCommand;
using SurveyModule.Application.Commands.SatisfactionCommand;
using SurveyModule.Application.DTOs;
using SurveyModule.Application.Queries.GetSurveyDetailsQuery;
using SurveyModule.Application.Queries.GetSurveyResult;
using SurveyModule.Application.Queries.GetSurveysQuery;
using ProjectMicro.Shared.Interfaces;

namespace SurveyModule.Api.Controllers
{
    [Route("api/surveys")]
    [ApiController]
    public class SurveyController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly ICurrentUserService _currentUser;
      public SurveyController(IMediator mediator, ICurrentUserService currentUser) {
            _mediator = mediator;
            _currentUser = currentUser;
      }

        [HttpGet]
        public async Task<IActionResult> GetAll() {

            var tenantId = _currentUser.User.TenantId;

            var data = await _mediator.Send(new GetSurveyQuery(tenantId));
            return Ok(data);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetDetail(int id)
        {
            var tenantId = _currentUser.User.TenantId;
            var userId = _currentUser.User.UserId;

            var data = await _mediator.Send(new GetSurveyDetailQuery(id,tenantId,userId));
            return Ok(data);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] SurveyDto survey)
        {
            int tenantId = _currentUser.User.TenantId;
            var data = await _mediator.Send(new AddSurveyCommand(survey, tenantId));
            return Ok("Survey Kaydedildi");
        }

        [HttpPost("user-answer")]
        public async Task<IActionResult> UserAnswer([FromBody] UserAnswerDto UserAnswer)
        {
            int userId = _currentUser.User.UserId;
            var data = await _mediator.Send(new AnswerSurveyCommand(UserAnswer,userId));
            return Ok("Cevaplar Kaydedildi");
        }

        [HttpGet("{id}/results")]
        public async Task<IActionResult> GetResults(int id)
        {
            var data = await _mediator.Send(new GetSurveyResultQuery(id));
            return Ok(data);
        }

        [HttpPost("{id}/satisfaction")]
        public async Task<IActionResult> CreateSatisfaction(int id, [FromBody] SatisfactionRateDto satisfaction)
        {
            var userId = _currentUser.User.UserId;
            var data = await _mediator.Send(new SatisfactionCommand(id,satisfaction,userId));
            return Ok(data);
        }
    }
}
