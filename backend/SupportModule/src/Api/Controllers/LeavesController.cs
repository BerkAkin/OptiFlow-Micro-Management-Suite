using MediatR;
using Microsoft.AspNetCore.Mvc;
using ProjectMicro.Shared.Interfaces;
using SupportModule.Application.Commands.ApproveOrRejectDayOffRequestCommand;
using SupportModule.Application.Commands.CreateDayOffCommand;
using SupportModule.Application.DTOs;
using SupportModule.Application.Queries.GetDayOffListQuery;
using SupportModule.Application.Queries.GetMyDayOffListQuery;

namespace SupportModule.Api.Controllers
{
    [Route("api/leaves")]
    [ApiController]
    public class LeavesController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly ICurrentUserService _currentUserService;

        public LeavesController(IMediator mediator, ICurrentUserService currentUserService)
        {
            _mediator = mediator;
            _currentUserService = currentUserService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var tenantId = _currentUserService.User.TenantId;
            var data = await _mediator.Send(new GetDayOffListQuery(tenantId));
            return Ok(data);

        }

        [HttpGet("me")]
        public async Task<IActionResult> GetMe([FromQuery] MyDaysOffFilterDto filters)
        {
            var tenantId = _currentUserService.User.TenantId;
            var userId = _currentUserService.User.UserId;
            var data = await _mediator.Send(new GetMyDayOffListQuery(tenantId, userId, filters));
            return Ok(new { values = data.data, data.maxPage });


        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateDayOffDto dto)
        {
            var tenantId = _currentUserService.User.TenantId;
            var userId = _currentUserService.User.UserId;
            var data = await _mediator.Send(new CreateDayOffCommand(tenantId, userId, dto));
            return Ok("Day Off Request Sent Succesfully");

        }

        [HttpPatch("{requestId}/status")]
        public async Task<IActionResult> Update(int requestId, [FromBody] ApproveOrRejectDto dto)
        {
            var tenantId = _currentUserService.User.TenantId;
            var data = await _mediator.Send(new ApproveOrRejectDayOffRequestCommand(requestId,dto, tenantId));
            return Ok("Request Status Updated Succesfully");
        }
    }
}
