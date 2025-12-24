using MediatR;
using Microsoft.AspNetCore.Mvc;
using SurveyModule.Application.Commands.AddSurvey;
using SurveyModule.Application.Commands.AnswerSurveyCommand;
using SurveyModule.Application.DTOs;
using SurveyModule.Application.Queries.GetSurveyDetailsQuery;
using SurveyModule.Application.Queries.GetSurveyResult;
using SurveyModule.Application.Queries.GetSurveysQuery;

namespace SurveyModule.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SurveyController : ControllerBase
    {
        private readonly IMediator _mediator;
      public SurveyController(IMediator mediator) {
            _mediator = mediator;
      }

        [HttpGet]
        public async Task<IActionResult> GetSurvey([FromQuery] int TenantId) {
            var data = await _mediator.Send(new GetSurveyQuery(TenantId));
            return Ok(data);
        }

        [HttpGet("SurveyDetail")]
        public async Task<IActionResult> GetSurveyDetail([FromQuery] int SurveyId)
        {
            var data = await _mediator.Send(new GetSurveyDetailQuery(SurveyId));
            return Ok(data);
        }

        [HttpPost]
        public async Task<IActionResult> AddSurvey([FromBody] SurveyDto survey)
        {
            var data = await _mediator.Send(new AddSurveyCommand(survey));
            return Ok("Survey Kaydedildi");
        }

        [HttpPost("UserAnswer")]
        public async Task<IActionResult> UserAnswer([FromBody] UserAnswerDto UserAnswer)
        {
            var data = await _mediator.Send(new AnswerSurveyCommand(UserAnswer));
            return Ok("Cevaplar Kaydedildi");
        }

        [HttpGet("SurveyResult")]
        public async Task<IActionResult> GetSurveyResult([FromQuery] int SurveyId)
        {
            var data = await _mediator.Send(new GetSurveyResultQuery(SurveyId));
            return Ok(data);
        }
           
    }
}
