using MediatR;
using Microsoft.AspNetCore.Mvc;
using ProjectMicro.Shared.Interfaces;
using SuggestionModule.Application.Commands.MakeCommentCommand;
using SuggestionModule.Application.DTOs;

namespace SuggestionModule.Api.Controllers
{
    [Route("api/suggestions/comments")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly ICurrentUserService _currentUserService;
        public CommentController(IMediator mediator, ICurrentUserService currentUserService)
        {
            _mediator = mediator;
            _currentUserService = currentUserService;
        }

        [HttpPost("{id}")]
        public async Task<IActionResult> CreateComment(int id, [FromBody] CreateCommentDto comment)
        {
            int userId = _currentUserService.User.UserId;
            await _mediator.Send(new MakeCommentCommand(id, comment, userId));
            return Ok();
        }

    }
}
