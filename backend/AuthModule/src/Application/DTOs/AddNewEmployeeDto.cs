namespace AuthModule.Application.DTOs
{
    public class AddNewEmployeeDto
    {
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Email { get; set; }
        public string PhoneNum { get; set; }
        public DateTime BirthDate { get; set; }
        public string Street { get; set; }
        public string Street2 { get; set; }
        public string ApartmentNum { get; set; }
        public string DoorNumber { get; set; }
        public string Province { get; set; }
        public string District { get; set; }
        public string FullAddress { get; set; }
        public int DepartmentId { get; set; }
    }
}
