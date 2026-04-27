using MediatR;
using Microsoft.AspNetCore.Mvc;
using NotificationService.Services;

namespace NotificationService.Controllers
{
    [Route("api/notifications")]
    [ApiController]
    public class NotificationController : ControllerBase
    {

        private readonly NotificationManager _notificationManager;


        public NotificationController(NotificationManager notificationManager)
        {

            _notificationManager = notificationManager;
        }

        [HttpPost("bulk/surveys/create")]
        public async Task<IActionResult> BulkSurveyCreate()
        {

            await _notificationManager.SurveyCreatedNotificationsAsync();
            return Accepted();
        }

        [HttpPost("bulk/surveys/timeout")]
        public async Task<IActionResult> BulkSurveyTimeout()
        {

            await _notificationManager.SurveyTimeoutNotificationsAsync();
            return Accepted();
        }

        [HttpPost("bulk/suggestions/create")]
        public async Task<IActionResult> BulkSuggestionCreate()
        {

            await _notificationManager.SuggestionCreatedNotificationsAsync();
            return Accepted();
        }

        [HttpPost("bulk/suggestions/status-updated")]
        public async Task<IActionResult> BulkSuggestionStatusUpdated()
        {

            await _notificationManager.SuggestionStatusChangedNotificationsAsync();
            return Accepted();
        }

        [HttpPost("bulk/moods/new-comment")]
        public async Task<IActionResult> BulkMoodNewComment()
        {

            await _notificationManager.MoodNewCommentNotificationsAsync();
            return Accepted();
        }

        [HttpPost("bulk/password-updated")]
        public async Task<IActionResult> BulkPasswordUpdated()
        {

            await _notificationManager.PasswordChangedNotificationsAsync();
            return Accepted();
        }

        [HttpPost("bulk/supports/dayoff-status-updated")]
        public async Task<IActionResult> BulkSupportDayOffStatusUpdated()
        {

            await _notificationManager.SupportDayOffStatusChangedRequestNotificationsAsync();
            return Accepted();
        }

        [HttpPost("bulk/supports/dayoff-created")]
        public async Task<IActionResult> BulkDayOffCreated()
        {

            await _notificationManager.SupportDayOffRequestNotificationsAsync();
            return Accepted();
        }

        [HttpPost("bulk/supports/request-newmessage")]
        public async Task<IActionResult> BulkSupportRequestNewMessage()
        {

            await _notificationManager.SupportRequestNewMessageNotificationsAsync();
            return Accepted();
        }

    }
}
