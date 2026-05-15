
using MediatR;
using Microsoft.AspNetCore.Mvc;
using ProjectMicro.Shared.Interfaces;
using SuggestionModule.Application.Commands.ChangeStatusCommand;
using SuggestionModule.Application.Commands.MakeSuggestionCommand;
using SuggestionModule.Application.Commands.MakeVoteCommand;
using SuggestionModule.Application.DTOs;
using SuggestionModule.Application.Queries.GetBestSuggestionsQuery;
using SuggestionModule.Application.Queries.GetSuggestionsQuery;

namespace SuggestionModule.Api.Controllers
{
    [Route("api/suggestions")]
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

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateSuggestionDto suggestion)
        {
            int userId = _currentUserService.User.UserId;
            int tenantId = _currentUserService.User.TenantId;
            await _mediator.Send(new MakeSuggestionCommand(suggestion, tenantId, userId));
            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            int tenantId = _currentUserService.User.TenantId;
            var data = await _mediator.Send(new GetSuggestionsQuery(tenantId));
            return Ok(data);
        }

        [HttpGet("me")]
        public async Task<IActionResult> GetMe()
        {
            int tenantId = _currentUserService.User.TenantId;
            int userId = _currentUserService.User.UserId;
            var data = await _mediator.Send(new GetMySuggestionsQuery(tenantId, userId));
            return Ok(data);
        }

        [HttpGet("best")]
        public async Task<IActionResult> GetBest()
        {
            int tenantId = _currentUserService.User.TenantId;
            var data = await _mediator.Send(new GetBestSuggestionsQuery(tenantId));
            return Ok(data);
        }

        [HttpPost("{id}/votes")]
        public async Task<IActionResult> Vote(int id, [FromBody] CreateVoteDto vote)
        {
            int userId = _currentUserService.User.UserId;
            await _mediator.Send(new MakeVoteCommand(id, vote, userId));
            return Ok();
        }

        [HttpPatch("{id}/status")]
        public async Task<IActionResult> Update(int id, [FromBody] StatusDto status)
        {
            await _mediator.Send(new ChangeStatusCommand(id, status));
            return Ok("Status Changed Successfully");
        }

    }
}
