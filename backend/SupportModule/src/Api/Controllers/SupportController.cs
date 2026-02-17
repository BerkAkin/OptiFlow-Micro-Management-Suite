using MediatR;
using Microsoft.AspNetCore.Mvc;
using SupportModule.Application.Commands.CreateSupportRequestCommand;
using SupportModule.Application.DTOs;
using SupportModule.Application.Queries.GetSupportMessagesQuery;
using SupportModule.Application.Queries.GetSupportRequestsQuery;

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
            //int currentUser = _currentUserService.User.UserId; ;
            //int currentTenant = _currentUserService.User.TenantId;
            var data = await _mediator.Send(new CreateSupportRequestCommand(supportMessage,1,1));
            return Ok(new { message = "İsteğiniz iletilmiştir" });
        }

        [HttpGet("GetSupportRequestList")]
        public async Task<IActionResult> GetSupportRequest()
        {
            //int currentUser = _currentUserService.User.UserId; ;
            //int currentTenant = _currentUserService.User.TenantId;
            var data = await _mediator.Send(new GetSupportRequestsQuery(1));
            return Ok(data);
        }

        [HttpGet("GetSupportMessages")]
        public async Task<IActionResult> GetSupportMessages()
        {
            //int currentUser = _currentUserService.User.UserId; ;
            //int currentTenant = _currentUserService.User.TenantId;
            var data = await _mediator.Send(new GetSupportMessagesQuery(1));
            return Ok(data);
        }
    }
}
