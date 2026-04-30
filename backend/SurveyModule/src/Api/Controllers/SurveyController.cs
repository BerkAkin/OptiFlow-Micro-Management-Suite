using MediatR;
using Microsoft.AspNetCore.Mvc;
using ProjectMicro.Shared.Interfaces;
using SurveyModule.Application.Commands.AddSurvey;
using SurveyModule.Application.DTOs;
using SurveyModule.Application.Queries.GetSurveyDetailsQuery;
using SurveyModule.Application.Queries.GetSurveysQuery;

namespace SurveyModule.Api.Controllers
{
    [Route("api/surveys")]
    [ApiController]
    public class SurveyController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly ICurrentUserService _currentUser;
        public SurveyController(IMediator mediator, ICurrentUserService currentUser)
        {
            _mediator = mediator;
            _currentUser = currentUser;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {

            var tenantId = _currentUser.User.TenantId;
            var data = await _mediator.Send(new GetSurveyQuery(tenantId));
            return Ok(data);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetDetail(int id)
        {
            var tenantId = _currentUser.User.TenantId;
            var userId = _currentUser.User.UserId;

            var data = await _mediator.Send(new GetSurveyDetailQuery(id, tenantId, userId));
            return Ok(data);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] SurveyDto survey)
        {
            int tenantId = _currentUser.User.TenantId;
            var data = await _mediator.Send(new CreateSurveyCommand(survey, tenantId));
            return Ok("Survey saved");
        }


    }
}
