using MediatR;
using Microsoft.AspNetCore.Mvc;
using SupportModule.Application.Commands.CreateSupportRequestCommand;
using SupportModule.Application.DTOs;
using SupportModule.Application.Queries.GetEmployeeListQuery;
using SupportModule.Application.Queries.GetMonthlyRequestCountsQuery;
using SupportModule.Application.Queries.GetMyRequestsQuery;
using SupportModule.Application.Queries.GetSupportMessagesQuery;
using SupportModule.Application.Queries.GetSupportRequestsQuery;
using ProjectMicro.Shared.Interfaces;
using SupportModule.Application.Queries.GetRequestsCategorical;
using SupportModule.Application.Commands.SendMessageCommand;
using SupportModule.Application.Commands.MarkAsClosedCommand;
using SupportModule.Application.Queries.GetUserListQuery;

namespace SupportModule.Api.Controllers
{
    [Route("api/[controller]")]
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

        [HttpPost("CreateSupportRequest")]
        public async Task<IActionResult> CreateSupportRequest([FromBody] CreateSupportRequestDto supportRequest)
        {
            int currentUser = _currentUserService.User.UserId;
            int currentTenant = _currentUserService.User.TenantId;

            await _mediator.Send(new CreateSupportRequestCommand(supportRequest, currentUser,currentTenant)); 
            return Ok(new { message = "İsteğiniz iletilmiştir" });
        }


        [HttpGet("GetSupportRequestMessages")]
        public async Task<IActionResult> GetSupportMessages([FromQuery] int RequestId)
        {
            int currentUser = _currentUserService.User.UserId;
            var data = await _mediator.Send(new GetSupportMessagesQuery(RequestId,currentUser));
            return Ok(data);
        }

        [HttpGet("GetSupportRequests")]
        public async Task<IActionResult> GetSupportRequest()
        {
            int currentTenant = _currentUserService.User.TenantId;
            var data = await _mediator.Send(new GetSupportRequestsQuery(currentTenant));
            return Ok(data);
        }

        [HttpGet("GetMyRequests")]
        public async Task<IActionResult> GetMyRequests()
        {
            int currentUser = _currentUserService.User.UserId; 
            var data = await _mediator.Send(new GetMyRequestsQuery(currentUser));
            return Ok(data);
        }

        [HttpGet("GetSupportRequestsCategorical")]
        public async Task<IActionResult> GetRequestsCategorical()
        {
            var currentTenant = _currentUserService.User.TenantId;
            var data = await _mediator.Send(new GetRequestsCategoricalQuery(currentTenant));
            return Ok(data);
        }

        [HttpGet("GetMonthlySupportRequestsCount")]
        public async Task<IActionResult> GetMonthlyRequestsCount()
        {
            var currentTenant = _currentUserService.User.TenantId;
            var data = await _mediator.Send(new GetMonthlyRequestCountsQuery(currentTenant));
            return Ok(data);
        }

        [HttpGet("GetEmployeeList")]
        public async Task<IActionResult> GetEmployeeList()
        {
            int currentTenant = _currentUserService.User.TenantId;
            var data = await _mediator.Send(new GetEmployeeListQuery(currentTenant));
            return Ok(data);
        }



        [HttpPost("SendMessage")]
        public async Task<IActionResult> SendMessage([FromBody] SendMessageDto msg)
        {
            int currentUser = _currentUserService.User.UserId;
            var data = await _mediator.Send(new SendMessageCommand(msg,currentUser));
            return Ok(data);
        }

        [HttpGet("MarkAsClosed")]
        public async Task<IActionResult> MarkAsClosed([FromQuery] int RequestId)
        {
            var tenantId = _currentUserService.User.TenantId;
            var data = await _mediator.Send(new MarkAsClosedCommand(RequestId, tenantId));
            return Ok(data);
        }

        [HttpGet("GetUserList")]
        public async Task<IActionResult> GetUserList()
        {
            int currentUser = _currentUserService.User.UserId;
            var tenantId = _currentUserService.User.TenantId;
            var data = await _mediator.Send(new GetUserListQuery(tenantId, currentUser));
            return Ok(data);
        }
    }
}
