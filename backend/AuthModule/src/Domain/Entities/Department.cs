
namespace AuthModule.Domain.Entities
{
    public class Department
    {
        public int Id { get; private set; }
        public string Name { get; private set; }
        private Department(){}

        public Department(string name)
        {
            if (string.IsNullOrWhiteSpace(name))
                throw new ArgumentException("Departmant name cannot be null");
            Name = name;
        }


        
    }
}
