using MediatR;
using Microsoft.AspNetCore.Mvc;
using MoodModule.Application.Commands.AddCommentCommand;
using MoodModule.Application.Commands.DeleteCommentCommand;
using MoodModule.Application.DTOs;
using MoodModule.Application.Queries.GetAllCommentsQuery;
using MoodModule.Application.Queries.GetCommentsQuery;
using MoodModule.Application.Queries.GetUsersQuery;
using ProjectMicro.Shared.Interfaces;

namespace MoodModule.Api.Controllers
{
    [Route("api/comments")]
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

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] AddCommentDto comment)
        {
            int currentTenant = _currentUserService.User.TenantId;
            var data = await _mediator.Send(new AddCommentCommand(comment, currentTenant));
            return Ok("Comment saved successfully");
        }

        [HttpGet("me")]
        public async Task<IActionResult> GetMine()
        {
            int currentUser = _currentUserService.User.UserId;
            var data = await _mediator.Send(new GetCommentsQuery(currentUser));
            return Ok(data);

        }
       
        [HttpGet("employees")]
        public async Task<IActionResult> GetEmployees()
        {
            int currentTenant = _currentUserService.User.TenantId;
            var data = await _mediator.Send(new GetUsersQuery(currentTenant));
            return Ok(data);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] int UserId)
        {
            int currentTenant = _currentUserService.User.TenantId;
            var data = await _mediator.Send(new GetAllCommentsQuery(UserId));
            return Ok(data);
        }

        [HttpDelete("{commentId}")]
        public async Task<IActionResult> Delete(int commentId, [FromQuery] int userId)
        {
            int currentTenant = _currentUserService.User.TenantId;
            var data = await _mediator.Send(new DeleteCommentCommand(commentId, userId, currentTenant));
            return Ok("Comment deleted successfully");
        }
        

    }
}
