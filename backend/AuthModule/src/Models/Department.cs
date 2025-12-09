using System.ComponentModel.DataAnnotations.Schema;

namespace AuthModule.Models
{
    public class Department
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
