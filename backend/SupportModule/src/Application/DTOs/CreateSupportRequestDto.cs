using SupportModule.Domain.Enums;

namespace SupportModule.Application.DTOs
{
    public class CreateSupportRequestDto
    {
        public string Message { get; set; }
        public SupportCategories Category { get; set; }
    }
}
