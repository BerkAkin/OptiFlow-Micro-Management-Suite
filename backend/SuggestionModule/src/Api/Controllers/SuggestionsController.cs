
using MediatR;
using Microsoft.AspNetCore.Mvc;
using SuggestionModule.Application.Commands.ChangeStatusCommand;
using SuggestionModule.Application.Commands.MakeCommentCommand;
using SuggestionModule.Application.Commands.MakeSuggestionCommand;
using SuggestionModule.Application.Commands.MakeVoteCommand;
using SuggestionModule.Application.DTOs;
using SuggestionModule.Application.Queries.GetBestSuggestionsQuery;
using SuggestionModule.Application.Queries.GetSuggestionsQuery;

namespace SuggestionModule.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SuggestionsController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly ICurrentUserService _currentUserService;
        public SuggestionsController(IMediator mediator, ICurrentUserService currentUserService)
        {
            _mediator = mediator;
            _currentUserService = currentUserService;
        }

        [HttpGet]
        public async Task<IActionResult> GetSuggestions() {
            int tenantId = _currentUserService.User.TenantId;
            var data = await _mediator.Send(new GetSuggestionsQuery(tenantId));
            return Ok(data);
        }

        [HttpGet("GetBest")]
        public async Task<IActionResult> GetBest()
        {
            int tenantId = _currentUserService.User.TenantId;
            var data = await _mediator.Send(new GetBestSuggestionsQuery(tenantId));
            return Ok(data);
        }

        [HttpPost("MakeComment")]
        public async Task<IActionResult> MakeComment([FromBody] CreateCommentDto comment)
        {
            int userId = _currentUserService.User.UserId;
            await _mediator.Send(new MakeCommentCommand(comment,userId));
            return Ok();
        }

        [HttpPost("Vote")]
        public async Task<IActionResult> Vote([FromBody] CreateVoteDto vote)
        {
            int userId = _currentUserService.User.UserId;
            await _mediator.Send(new MakeVoteCommand(vote,userId));
            return Ok();
        }

        [HttpPost("ChangeStatus")]
        public async Task<IActionResult> ChangeStatus([FromBody] StatusDto status)
        {
            await _mediator.Send(new ChangeStatusCommand(status));
            return Ok("Status Changed Successfully");
        }


        [HttpPost("MakeSuggestion")]
        public async Task<IActionResult> MakeSuggestion([FromBody] CreateSuggestionDto suggestion)
        {
            int userId = _currentUserService.User.UserId;
            int tenantId = _currentUserService.User.TenantId;
            await _mediator.Send(new MakeSuggestionCommand(suggestion, tenantId, userId));
            return Ok();
        }
    }
}
