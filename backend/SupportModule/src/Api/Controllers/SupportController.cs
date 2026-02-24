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
using SupportModule.Application.Commands.SendMessageCommand;

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
            var data = await _mediator.Send(new GetSupportMessagesQuery(RequestId));
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

        [HttpPost("CreateEmployeeRating")]
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

        [HttpGet("GetMyComments")]
        public async Task<IActionResult> GetMyEmployeeComments()
        {
            int currentUser = _currentUserService.User.UserId; 
            var data = await _mediator.Send(new GetEmployeeCommentsQuery(currentUser));
            return Ok(data);
        }

        [HttpPost("SendMessage")]
        public async Task<IActionResult> SendMessage([FromBody] SendMessageDto msg)
        {
            int currentUser = _currentUserService.User.UserId;
            var data = await _mediator.Send(new SendMessageCommand(msg,currentUser));
            return Ok(data);
        }
    }
}
