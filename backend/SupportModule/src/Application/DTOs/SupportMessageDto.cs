
using SupportModule.Domain.Enums;

namespace SupportModule.Application.DTOs
{
    public class SupportMessageDto
    {
        public string Message { get; set; }
        public SupportCategories Category { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
