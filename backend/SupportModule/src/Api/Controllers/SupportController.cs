using MediatR;
using Microsoft.AspNetCore.Mvc;
using ProjectMicro.Shared.Interfaces;
using SupportModule.Application.Commands.CreateSupportRequestCommand;
using SupportModule.Application.Commands.MarkAsClosedCommand;
using SupportModule.Application.Commands.SendMessageCommand;
using SupportModule.Application.DTOs;
using SupportModule.Application.Queries.GetMonthlyRequestCountsQuery;
using SupportModule.Application.Queries.GetRequestsCategorical;
using SupportModule.Application.Queries.GetSupportMessagesQuery;
using SupportModule.Application.Queries.GetSupportRequestsQuery;
using SupportModule.Application.Queries.GetUserListQuery;

namespace SupportModule.Api.Controllers
{
    [Route("api/supports")]
    [ApiController]
    public class SupportController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly ICurrentUserService _currentUserService;

        public SupportController(IMediator mediator, ICurrentUserService currentUserService)
        {
            _mediator = mediator;
            _currentUserService = currentUserService;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateSupportRequestDto supportRequest)
        {
            int currentUser = _currentUserService.User.UserId;
            int currentTenant = _currentUserService.User.TenantId;

            await _mediator.Send(new CreateSupportRequestCommand(supportRequest, currentUser, currentTenant));
            return Ok(new { message = "İsteğiniz iletilmiştir" });
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            int currentTenant = _currentUserService.User.TenantId;
            int currentDepartment = _currentUserService.User.DepartmentId;
            int currentUser = _currentUserService.User.UserId;
            var data = await _mediator.Send(new GetSupportRequestsQuery(currentTenant, currentDepartment, currentUser));
            return Ok(data);
        }

        [HttpGet("{requestId}/messages")]
        public async Task<IActionResult> GetMessages(int requestId)
        {
            int currentUser = _currentUserService.User.UserId;
            var data = await _mediator.Send(new GetSupportMessagesQuery(requestId, currentUser));
            return Ok(data);
        }

        [HttpPost("{requestId}/messages")]
        public async Task<IActionResult> SendMessage(int requestId, [FromBody] SendMessageDto msg)
        {
            int currentUser = _currentUserService.User.UserId;
            var data = await _mediator.Send(new SendMessageCommand(requestId, msg, currentUser));
            return Ok(data);
        }

        [HttpPatch("{requestId}/close")]
        public async Task<IActionResult> Close(int requestId)
        {
            var tenantId = _currentUserService.User.TenantId;
            var data = await _mediator.Send(new MarkAsClosedCommand(requestId, tenantId));
            return Ok(data);
        }



        [HttpGet("stats/categorical")]
        public async Task<IActionResult> GetCategorical()
        {
            var currentTenant = _currentUserService.User.TenantId;
            var data = await _mediator.Send(new GetRequestsCategoricalQuery(currentTenant));
            return Ok(data);
        }

        [HttpGet("stats/monthly-count")]
        public async Task<IActionResult> GetCount()
        {
            var currentTenant = _currentUserService.User.TenantId;
            var data = await _mediator.Send(new GetMonthlyRequestCountsQuery(currentTenant));
            return Ok(data);
        }



        [HttpGet("available-employees")]
        public async Task<IActionResult> GetEmployees()
        {
            int currentUser = _currentUserService.User.UserId;
            var tenantId = _currentUserService.User.TenantId;
            int currentDepartment = _currentUserService.User.DepartmentId;
            var data = await _mediator.Send(new GetUserListQuery(tenantId, currentDepartment, currentUser));
            return Ok(data);
        }


    }
}
