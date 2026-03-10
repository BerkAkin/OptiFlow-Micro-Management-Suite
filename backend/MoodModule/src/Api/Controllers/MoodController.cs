using MediatR;
using Microsoft.AspNetCore.Mvc;
using MoodModule.Application.Commands.AddCommentCommand;
using MoodModule.Application.Commands.AddMoodRecordCommand;
using MoodModule.Application.Commands.DeleteCommentCommand;
using MoodModule.Application.DTOs;
using MoodModule.Application.Queries.GetAllCommentsQuery;
using MoodModule.Application.Queries.GetCommentsQuery;
using MoodModule.Application.Queries.GetMoodsQuery;
using MoodModule.Application.Queries.GetPreviousMoodsQuery;
using MoodModule.Application.Queries.GetUsersQuery;
using MoodModule.Migrations;
using ProjectMicro.Shared.Interfaces;
using ProjectMicro.Shared.Models;

namespace MoodModule.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MoodController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly ICurrentUserService _currentUserService;

        public MoodController(IMediator mediator, ICurrentUserService currentUserService)
        {
            _mediator = mediator;
            _currentUserService = currentUserService;
        }

        [HttpGet]
        public async Task<IActionResult> GetMoods([FromQuery] MoodFilterDto filters) {
            int currentUser = _currentUserService.User.UserId;
            int currentTenant = _currentUserService.User.TenantId;
            var (data, maxPage) = await _mediator.Send(new GetMoodsQuery(currentTenant,currentUser,filters));
            return Ok(new
            {
                data,
                maxPage
            });
        }

        [HttpPost]
        public async Task<IActionResult> AddMoodRecord([FromBody] AddMoodRecordDto mood)
        {
            int currentUser = _currentUserService.User.UserId;
            int currentTenant = _currentUserService.User.TenantId;
            await _mediator.Send(new AddMoodRecordCommand(mood,currentUser,currentTenant));
            return Ok("Mood saved succesfully");
        }

        [HttpGet("Previous")]
        public async Task<IActionResult> GetPreviousMoods()
        {
            int currentUser = _currentUserService.User.UserId;
            int currentTenant = _currentUserService.User.TenantId;
            var data = await _mediator.Send(new GetPreviousMoodsQuery(currentTenant,currentUser));
            return Ok(data);
        }

        [HttpPost("Comment")]
        public async Task<IActionResult> AddComment([FromBody] AddCommentDto comment)
        {
            int currentTenant = _currentUserService.User.TenantId;
            var data = await _mediator.Send(new AddCommentCommand(comment, currentTenant));
            return Ok("Comment saved successfully");
        }

        [HttpDelete("Comment")]
        public async Task<IActionResult> DeleteComment([FromBody] DeleteCommentDto comment)
        {
            int currentTenant = _currentUserService.User.TenantId;
            var data = await _mediator.Send(new DeleteCommentCommand(comment, currentTenant));
            return Ok("Comment deleted successfully");
        }

        [HttpGet("Users")]
        public async Task<IActionResult> GetUsers()
        {
            int currentTenant = _currentUserService.User.TenantId;
            var data = await _mediator.Send(new GetUsersQuery(currentTenant));
            return Ok(data);
        }

        [HttpGet("AllComments")]
        public async Task<IActionResult> GetAllComments([FromQuery] int UserId)
        {
            int currentTenant = _currentUserService.User.TenantId;
            var data = await _mediator.Send(new GetAllCommentsQuery(UserId));
            return Ok(data);

        }

        [HttpGet("MyComments")]
        public async Task<IActionResult> GetComments()
        {
            int currentUser = _currentUserService.User.UserId;
            var data = await _mediator.Send(new GetCommentsQuery(currentUser));
            return Ok(data);

        }
    }
}
