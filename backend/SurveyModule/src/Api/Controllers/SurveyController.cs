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
    [Route("api/[controller]")]
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
        public async Task<IActionResult> GetSurvey() {

            var tenantId = _currentUser.User.TenantId;

            var data = await _mediator.Send(new GetSurveyQuery(tenantId));
            return Ok(data);
        }

        [HttpGet("SurveyDetail")]
        public async Task<IActionResult> GetSurveyDetail([FromQuery] int id)
        {
            var tenantId = _currentUser.User.TenantId;
            var userId = _currentUser.User.UserId;

            var data = await _mediator.Send(new GetSurveyDetailQuery(id,tenantId,userId));
            return Ok(data);
        }

        [HttpPost]
        public async Task<IActionResult> AddSurvey([FromBody] SurveyDto survey)
        {
            int tenantId = _currentUser.User.TenantId;
            var data = await _mediator.Send(new AddSurveyCommand(survey, tenantId));
            return Ok("Survey Kaydedildi");
        }

        [HttpPost("UserAnswer")]
        public async Task<IActionResult> UserAnswer([FromBody] UserAnswerDto UserAnswer)
        {
            int userId = _currentUser.User.UserId;
            var data = await _mediator.Send(new AnswerSurveyCommand(UserAnswer,userId));
            return Ok("Cevaplar Kaydedildi");
        }

        [HttpGet("SurveyResult")]
        public async Task<IActionResult> GetSurveyResult([FromQuery] int id)
        {
            var data = await _mediator.Send(new GetSurveyResultQuery(id));
            return Ok(data);
        }

        [HttpPost("Satisfaction")]
        public async Task<IActionResult> AddSatisfaction([FromBody] SatisfactionRateDto satisfaction)
        {
            var userId = _currentUser.User.UserId;
            var data = await _mediator.Send(new SatisfactionCommand(satisfaction,userId));
            return Ok(data);
        }
    }
}
