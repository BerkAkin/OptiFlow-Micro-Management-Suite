using System.Net;
using System.Net.Mail;
using NotificationService.Models.Enums;

namespace NotificationService.Services
{
    public class MailService
    {
        private readonly MailTemplateProvider _templateProvider;
        private readonly IConfiguration _config;
        private readonly IWebHostEnvironment _env;

        public MailService(MailTemplateProvider templateProvider, IConfiguration config, IWebHostEnvironment env)
        {
            _templateProvider = templateProvider;
            _config = config;
            _env = env;
        }

        public async Task SendMailAsync(string to, string userName, string type)
        {
            if (!Enum.TryParse(type, true, out NotificationType notificationEnum))
            {
                throw new Exception($"Geçersiz bildirim tipi: {type}");
            }
            var (subject, fileName) = _templateProvider.GetTemplateDetails(notificationEnum);

            string templatePath = Path.Combine(_env.ContentRootPath, "Templates", fileName);
            string htmlContent = await File.ReadAllTextAsync(templatePath);

            htmlContent = htmlContent.Replace("{{UserName}}", userName);

            var fromEmail = _config["EmailSettings:Email"];
            var password = _config["EmailSettings:Password"];


            using var client = new SmtpClient("smtp.gmail.com", 587)
            {
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(fromEmail, password),
                EnableSsl = true
            };

            var mailMessage = new MailMessage
            {
                From = new MailAddress(fromEmail, "Optiflow Bilgilendirme !"),
                Subject = subject,
                Body = htmlContent,
                IsBodyHtml = true
            };

            mailMessage.To.Add(to);

            await client.SendMailAsync(mailMessage);
        }
    }
}