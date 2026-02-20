using MediatR;
using Microsoft.AspNetCore.Mvc;
using SupportModule.Application.Commands.CreateEmployeeCommentCommand;
using SupportModule.Application.Commands.CreateSupportRequestCommand;
using SupportModule.Application.Commands.DeleteEmployeeCommentCommand;
using SupportModule.Application.DTOs;
using SupportModule.Application.Queries.GetEmployeeCommentsQuery;
using SupportModule.Application.Queries.GetEmployeeListQuery;
using SupportModule.Application.Queries.GetMonthlyRequestCountsQuery;
using SupportModule.Application.Queries.GetMyRequestsQuery;
using SupportModule.Application.Queries.GetSupportMessagesQuery;
using SupportModule.Application.Queries.GetSupportRequestsQuery;
using ProjectMicro.Shared.Interfaces;
using SupportModule.Application.Queries.GetRequestsCategorical;

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
        public async Task<IActionResult> CreateSupportRequest([FromBody] SupportMessageDto supportMessage)
        {
            int currentUser = _currentUserService.User.UserId;
            int currentTenant = _currentUserService.User.TenantId;
            await _mediator.Send(new CreateSupportRequestCommand(supportMessage,currentUser,currentTenant)); 
            return Ok(new { message = "İsteğiniz iletilmiştir" });
        }

        [HttpGet("GetSupportRequestList")]
        public async Task<IActionResult> GetSupportRequest()
        {
            int currentTenant = _currentUserService.User.TenantId;
            var data = await _mediator.Send(new GetSupportRequestsQuery(currentTenant));
            return Ok(data);
        }

        [HttpGet("GetSupportMessages")]
        public async Task<IActionResult> GetSupportMessages([FromQuery] int RequestId)
        {
            var data = await _mediator.Send(new GetSupportMessagesQuery(RequestId));
            return Ok(data);
        }

        [HttpGet("MyRequests")]
        public async Task<IActionResult> GetMyRequests()
        {
            int currentUser = _currentUserService.User.UserId; 
            var data = await _mediator.Send(new GetMyRequestsQuery(currentUser));
            return Ok(data);
        }

        [HttpGet("GetSupportRequestCategorical")]
        public async Task<IActionResult> GetRequestsCategorical()
        {
            //var currentTenant = _currentUserService.User.TenantId;
            var data = await _mediator.Send(new GetRequestsCategoricalQuery(1));
            return Ok(data);
        }

        [HttpGet("MonthlyRequestsCount")]
        public async Task<IActionResult> GetMonthlyRequestsCount(int tenantId)
        {
            var data = await _mediator.Send(new GetMonthlyRequestCountsQuery(tenantId));
            return Ok(data);
        }

        [HttpGet("EmployeeList")]
        public async Task<IActionResult> GetEmployeeList()
        {
            int currentTenant = _currentUserService.User.TenantId;
            var data = await _mediator.Send(new GetEmployeeListQuery(currentTenant));
            return Ok(data);
        }

        [HttpPost("RateEmployee")]
        public async Task<IActionResult> RateEmployee([FromBody] UserCommentDto Comment)
        {
            await _mediator.Send(new CreateEmployeeCommentCommand(Comment));
            return Ok(new { message = "Yorum başarıyla kaydedildi" });
        }

        [HttpGet("GetEmployeeComments")]
        public async Task<IActionResult> GetEmployeeComments([FromQuery] int UserId)
        {
            var data = await _mediator.Send(new GetEmployeeCommentsQuery(UserId));
            return Ok(data);
        }

        [HttpDelete("DeleteEmployeeComment")]
        public async Task<IActionResult> DeleteEmployeeComment([FromQuery] int commentId)
        {
            await _mediator.Send(new DeleteEmployeeCommentCommand(commentId));
            return Ok(new { message = "Yorum başarıyla silindi" });
        }

        [HttpGet("GetMyEmployeeComments")]
        public async Task<IActionResult> GetMyEmployeeComments()
        {
            int currentUser = _currentUserService.User.UserId; 
            var data = await _mediator.Send(new GetEmployeeCommentsQuery(currentUser));
            return Ok(data);
        }
    }
}
