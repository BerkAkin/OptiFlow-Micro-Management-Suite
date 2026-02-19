using SupportModule.Domain.Enums;

namespace SupportModule.Application.DTOs
{
    public class SupportRequestsDto
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public SupportCategories Category { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool IsClosed { get; set; }

    }
}
