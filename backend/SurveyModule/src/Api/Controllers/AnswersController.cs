using MediatR;
using Microsoft.AspNetCore.Mvc;
using ProjectMicro.Shared.Interfaces;
using SurveyModule.Application.Commands.AnswerSurveyCommand;
using SurveyModule.Application.DTOs;
using SurveyModule.Application.Queries.GetSurveyResult;

namespace SurveyModule.Api.Controllers
{
    [Route("api/answers")]
    [ApiController]
    public class AnswersController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly ICurrentUserService _currentUser;
        public AnswersController(IMediator mediator, ICurrentUserService currentUser)
        {
            _mediator = mediator;
            _currentUser = currentUser;
        }

        [HttpPost("user-answer")]
        public async Task<IActionResult> Create([FromBody] UserAnswerDto UserAnswer)
        {
            int userId = _currentUser.User.UserId;
            int tenantId = _currentUser.User.TenantId;
            var data = await _mediator.Send(new CreateAnswersCommand(tenantId, userId, UserAnswer));
            return Ok("Your answer saved succesfully");
        }

        [HttpGet("{id}/results")]
        public async Task<IActionResult> GetAll(int id)
        {
            var data = await _mediator.Send(new GetSurveyResultQuery(id));
            return Ok(data);
        }

    }
}
