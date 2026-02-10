namespace SuggestionModule.Application.DTOs
{
    public class MostSuggestionsDto
    {
        public BestSuggestionThisMonthDto thisMonth { get; set; }
        public BestSuggestionAllTimes Best { get; set; }

    }
}
