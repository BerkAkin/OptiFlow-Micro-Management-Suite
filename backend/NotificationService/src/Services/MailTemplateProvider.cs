using NotificationService.Models.Enums;

namespace NotificationService.Services
{
    public class MailTemplateProvider
    {
        public (string Subject, string FileName) GetTemplateDetails(NotificationType type)
        {
            return type switch
            {
                NotificationType.SurveyCreated => ("Yeni Bir Anket Var!", "SurveyCreatedTemplate.html"),
                NotificationType.SurveyTimeout => ("Anket Süresi Doldu!", "SurveyTimeoutTemplate.html"),
                NotificationType.SuggestionCreated => ("Yeni Bir Öneri Var!", "SuggestionCreatedTemplate.html"),
                NotificationType.SuggestionStatusChanged => ("Önerinizin Durumu Güncellendi!", "SuggestionStatusChangedTemplate.html"),
                NotificationType.MoodNewComment => ("Yeni Bir Çalışan Yorumunuz Var!", "MoodNewCommentTemplate.html"),
                NotificationType.ProfilePasswordChanged => ("Hesap Parola Değişikliği!", "ProfilePasswordChangedTemplate.html"),
                NotificationType.SupportDayOffStatusChanged => ("İzin İsteğiniz Hakkında Güncelleme!", "SupportDayOffStatusChangedTemplate.html"),
                NotificationType.SupportDayOffRequest => ("Yeni Bir Çalışan İzin İsteği Var!", "SupportDayOffRequestTemplate.html"),
                NotificationType.SupportRequestNewMessage => ("Destek Talebiniz Güncellendi!", "SupportRequestNewMessageTemplate.html"),
                _ => ("Bilgilendirme", "DefaultTemplate.html")
            };
        }
    }
}
