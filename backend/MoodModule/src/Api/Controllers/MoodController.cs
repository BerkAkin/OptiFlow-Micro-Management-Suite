using MediatR;
using Microsoft.AspNetCore.Mvc;
using MoodModule.Application.Commands.AddMoodRecordCommand;
using MoodModule.Application.DTOs;
using MoodModule.Application.Queries.GetMoodsQuery;
using MoodModule.Application.Queries.GetPreviousMoodsQuery;
using ProjectMicro.Shared.Interfaces;

namespace MoodModule.Api.Controllers
{
    [Route("api/moods")]
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


        [HttpPost]
        public async Task<IActionResult> Create([FromBody] AddMoodRecordDto mood)
        {
            int currentUser = _currentUserService.User.UserId;
            int currentTenant = _currentUserService.User.TenantId;
            await _mediator.Send(new AddMoodRecordCommand(mood,currentUser,currentTenant));
            return Ok("Mood saved succesfully");
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] MoodFilterDto filters) {
            int currentUser = _currentUserService.User.UserId;
            int currentTenant = _currentUserService.User.TenantId;
            int currentDepartment = _currentUserService.User.DepartmentId;
            var (data, maxPage) = await _mediator.Send(new GetMoodsQuery(currentTenant,currentUser,currentDepartment,filters));
            return Ok(new
            {
                data,
                maxPage
            });
        }

        [HttpGet("latest")]
        public async Task<IActionResult> GetLatest()
        {
            int currentUser = _currentUserService.User.UserId;
            int currentTenant = _currentUserService.User.TenantId;
            var data = await _mediator.Send(new GetPreviousMoodsQuery(currentTenant,currentUser));
            return Ok(data);
        }


    }
}
