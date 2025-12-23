using MediatR;
using Microsoft.AspNetCore.Mvc;
using SurveyModule.Application.Commands.AddSurvey;
using SurveyModule.Application.DTOs;
using SurveyModule.Application.Queries.GetSurveyDetails;
using SurveyModule.Application.Queries.GetSurveys;

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
            return Ok(data);
        }
           
    }
}
