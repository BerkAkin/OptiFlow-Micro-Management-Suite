using MediatR;
using Microsoft.AspNetCore.Mvc;
using NotificationService.Services;
using ProjectMicro.Shared.Interfaces;

namespace NotificationService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationController : ControllerBase
    {

        private readonly NotificationManager _notificationManager;
        private readonly ICurrentUserService _currentUserService;
        private readonly IMediator _mediator;

        public NotificationController(NotificationManager notificationManager, ICurrentUserService currentUserService,IMediator mediator)
        {

            _notificationManager = notificationManager;
            _currentUserService = currentUserService;
            _mediator = mediator;
        }

        [HttpPost("send-bulk-survey-create")]
        public async Task<IActionResult> SendBulkSurveyCreate()
        {

            await _notificationManager.SurveyCreatedNotificationsAsync();
            return Accepted();
        }

        [HttpPost("send-bulk-survey-timeout")]
        public async Task<IActionResult> SendBulkSurveyTimeout()
        {

            await _notificationManager.SurveyTimeoutNotificationsAsync();
            return Accepted();
        }

        [HttpPost("send-bulk-suggestion-create")]
        public async Task<IActionResult> SendBulkSuggestionCreate()
        {

            await _notificationManager.SuggestionCreatedNotificationsAsync();
            return Accepted();
        }

        [HttpPost("send-bulk-suggestion-status-changed")]
        public async Task<IActionResult> SendBulkSuggestionStatusUpdate()
        {

            await _notificationManager.SuggestionStatusChangedNotificationsAsync();
            return Accepted();
        }

        [HttpPost("send-bulk-mood-new-comment")]
        public async Task<IActionResult> SendBulkMoodNewComment()
        {

            await _notificationManager.MoodNewCommentNotificationsAsync();
            return Accepted();
        }

        [HttpPost("send-bulk-password-changed")]
        public async Task<IActionResult> SendBulkPasswordChanged()
        {

            await _notificationManager.PasswordChangedNotificationsAsync();
            return Accepted();
        }

        [HttpPost("send-bulk-support-dayoff-status-changed")]
        public async Task<IActionResult> SendBulkSupportDayOffStatusChanged()
        {

            await _notificationManager.SupportDayOffStatusChangedRequestNotificationsAsync();
            return Accepted();
        }

        [HttpPost("send-bulk-support-dayoff-created")]
        public async Task<IActionResult> SendBulkDayOffCreated()
        {

            await _notificationManager.SupportDayOffRequestNotificationsAsync();
            return Accepted();
        }

        [HttpPost("send-bulk-support-request-newmessage")]
        public async Task<IActionResult> SendBulkSupportRequestNewMessage()
        {

            await _notificationManager.SupportRequestNewMessageNotificationsAsync();
            return Accepted();
        }

        [HttpPost("emailPreference")]
        public async Task<IActionResult> ChangeEmailPreference()
        {
            int currentUser = _currentUserService.User.UserId;
            await _mediator.Send(new UpdatePreferenceCommand(currentUser));
            return Ok("Kullanıcı Bildirim İzni Başarıyla Değiştirildi");
        }

        [HttpGet("emailPreference")]
        public async Task<IActionResult> GetEmailPreferenceStatus(int userId)
        {
            int currentUser = _currentUserService.User.UserId;
            var isEnabled = await _mediator.Send(new GetPreferenceQuery(currentUser));
            return Ok(isEnabled);
        }
    }
}
