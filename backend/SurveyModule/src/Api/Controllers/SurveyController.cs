using MediatR;
using Microsoft.AspNetCore.Mvc;
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
           
    }
}
