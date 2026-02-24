using SupportModule.Domain.Enums;

namespace SupportModule.Application.DTOs
{
    public class CreateSupportRequestDto
    {
        public string Content { get; set; }
        public SupportCategories Category { get; set; }
    }
}
