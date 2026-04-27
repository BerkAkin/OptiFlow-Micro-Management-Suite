using MediatR;
using Microsoft.AspNetCore.Mvc;
using NotificationService.Services;
using ProjectMicro.Shared.Interfaces;

namespace NotificationService.Controllers
{
    [Route("api/preferences")]
    [ApiController]
    public class PreferenceController : ControllerBase
    {
        private readonly ICurrentUserService _currentUserService;
        private readonly IMediator _mediator;

        public PreferenceController(ICurrentUserService currentUserService, IMediator mediator)
        {

            _currentUserService = currentUserService;
            _mediator = mediator;
        }

        [HttpPatch]
        public async Task<IActionResult> Update()
        {
            int currentUser = _currentUserService.User.UserId;
            await _mediator.Send(new UpdatePreferenceCommand(currentUser));
            return Ok("Kullanıcı Bildirim İzni Başarıyla Değiştirildi");
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            int currentUser = _currentUserService.User.UserId;
            var isEnabled = await _mediator.Send(new GetPreferenceQuery(currentUser));
            return Ok(isEnabled);
        }
    }
}
