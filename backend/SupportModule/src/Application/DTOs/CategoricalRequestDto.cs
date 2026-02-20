using SupportModule.Domain.Enums;

namespace SupportModule.Application.DTOs
{
    public class CategoricalRequestDto
    {
        public int Count { get; set; }
        public SupportCategories Category { get; set; }
        public string CategoryName => Category.ToString();
    }
}
