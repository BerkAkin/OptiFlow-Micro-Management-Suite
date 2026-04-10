using Microsoft.EntityFrameworkCore;
using NotificationService.Data;

namespace NotificationService.Services
{
    public class NotificationManager 
    {
        private readonly AppDbContext _context;
        private readonly MailService _mailService;

        public NotificationManager(AppDbContext context, MailService mailService)
        {
            _context = context;
            _mailService = mailService;
        }

        public async Task SurveyCreatedNotificationsAsync()
        {
            var users = await _context.Users.Where(u => u.NotificationPreference).ToListAsync();

            foreach (var user in users)
            {
                await _mailService.SendMailAsync(user.Email, user.Username, "SurveyCreated");
            }
        }

        public async Task SurveyTimeoutNotificationsAsync()
        {
            var users = await _context.Users.Where(u => u.NotificationPreference).ToListAsync();

            foreach (var user in users)
            {
                await _mailService.SendMailAsync(user.Email, user.Username, "SurveyTimeout");
            }
        }

        public async Task SupportRequestNewMessageNotificationsAsync()
        {
            var users = await _context.Users.Where(u => u.NotificationPreference).ToListAsync();

            foreach (var user in users)
            {
                await _mailService.SendMailAsync(user.Email, user.Username, "SupportRequestNewMessage");
            }
        }

        public async Task SupportDayOffRequestNotificationsAsync()
        {
            var users = await _context.Users.Where(u => u.NotificationPreference).ToListAsync();

            foreach (var user in users)
            {
                await _mailService.SendMailAsync(user.Email, user.Username, "SupportDayOffRequest");
            }
        }
        public async Task SupportDayOffStatusChangedRequestNotificationsAsync()
        {
            var users = await _context.Users.Where(u => u.NotificationPreference).ToListAsync();

            foreach (var user in users)
            {
                await _mailService.SendMailAsync(user.Email, user.Username, "SupportDayOffStatusChanged");
            }
        }
        public async Task SuggestionCreatedNotificationsAsync()
        {
            var users = await _context.Users.Where(u => u.NotificationPreference).ToListAsync();

            foreach (var user in users)
            {
                await _mailService.SendMailAsync(user.Email, user.Username, "SuggestionCreated");
            }
        }
        public async Task SuggestionStatusChangedNotificationsAsync()
        {
            var users = await _context.Users.Where(u => u.NotificationPreference).ToListAsync();

            foreach (var user in users)
            {
                await _mailService.SendMailAsync(user.Email, user.Username, "SuggestionStatusChanged");
            }
        }
        public async Task MoodNewCommentNotificationsAsync()
        {
            var users = await _context.Users.Where(u => u.NotificationPreference).ToListAsync();

            foreach (var user in users)
            {
                await _mailService.SendMailAsync(user.Email, user.Username, "MoodNewComment");
            }
        }
        public async Task PasswordChangedNotificationsAsync()
        {
            var users = await _context.Users.Where(u => u.NotificationPreference).ToListAsync();

            foreach (var user in users)
            {
                await _mailService.SendMailAsync(user.Email, user.Username, "ProfilePasswordChanged");
            }
        }
    }
}
