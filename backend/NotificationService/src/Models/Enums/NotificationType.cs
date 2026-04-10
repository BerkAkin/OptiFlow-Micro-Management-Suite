namespace NotificationService.Models.Enums
{
    public enum NotificationType
    {
        SurveyCreated = 1,
        SurveyTimeout = 2,
        SuggestionCreated=3,
        SuggestionStatusChanged=4,
        SupportRequestNewMessage=5,
        SupportDayOffRequest=6, 
        SupportDayOffStatusChanged=7,
        MoodNewComment=8,
        ProfilePasswordChanged=9,
    }
}
