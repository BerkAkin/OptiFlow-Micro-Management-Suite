
using ProjectMicro.Shared.Enums;

namespace AuthModule.Domain.Entities
{
    public class User
    {
        public int Id { get; private set; }
        public string Firstname { get; private set; }
        public string Lastname { get; private set; }
        public string Email { get; private set; }
        public string PasswordHash { get; private set; }
        public string PhoneNum { get; private set; }
        public DateTime BirthDate { get; private set; }

        public string? ProfilePicture { get; private set; } = null;
        public IsActiveEnum IsActive { get; private set; }

        public string Street { get; private set; }
        public string Street2 { get; private set; }
        public string ApartmentNum { get; private set; }
        public string DoorNumber { get; private set; }
        public string Province { get; private set; }
        public string District { get; private set; }
        public string FullAddress { get; private set; }
        public DateTime DateCreate { get; private set; }
        public DateTime DateUpdate { get; private set; }




        public int TenantId { get; private set; }
        public Tenant Tenant { get; private set; }

        public int DepartmentId { get; private set; }
        public Department Department { get; private set; }

        public RefreshToken RefreshToken { get; private set; }
        public PasswordToken PasswordToken { get; private set; }


        private User() { }

        public User(string firstname, string lastname, string email, string passwordHash, string phoneNum, DateTime birthdate
            , string? profilePicture, IsActiveEnum isActive, string street, string street2, string apartment, string door,
            string province, string district, string fullAddress, DateTime created, DateTime updated,
            int tenantId, int departmentId
            )
        {
            Firstname = firstname;
            Lastname = lastname;
            Email = email;
            PasswordHash = passwordHash;
            PhoneNum = phoneNum;
            BirthDate = birthdate;
            ProfilePicture = profilePicture;
            IsActive = isActive;
            Street = street;
            Street2 = street2;
            ApartmentNum = apartment;
            DoorNumber = door;
            Province = province;
            District = district;
            FullAddress = fullAddress;
            DateCreate = created;
            DateUpdate = updated;
            TenantId = tenantId;
            DepartmentId = departmentId;

        }

        public void AddRefreshToken(string refreshToken)
        {
            if (this.RefreshToken != null)
            {
                this.RefreshToken.UpdateToken(refreshToken);
            }
            else
            {
                this.RefreshToken = new RefreshToken(refreshToken, this.Id);
            }
        }

        public void AddPasswordToken(string passwordToken)
        {
            if (this.PasswordToken != null)
            {
                this.PasswordToken.UpdatePasswordToken(passwordToken);
            }
            else
            {
                this.PasswordToken = new PasswordToken(passwordToken, this.Id);
            }
        }

        public void UpdateDepartment(int departmentId)
        {
            this.DepartmentId = departmentId;
            this.DateUpdate = DateTime.UtcNow;
        }

        public void UpdateStatus(IsActiveEnum status)
        {
            this.IsActive = status;
            this.DateUpdate = DateTime.UtcNow;
        }

        public void ResetPassword(string newPasswordHash)
        {
            this.PasswordHash = newPasswordHash;
            this.DateUpdate = DateTime.UtcNow;

            if (this.PasswordToken != null)
            {
                this.PasswordToken.ClearToken();
            }
        }

        public void UpdatePassword(string newPasswordHash)
        {
            this.PasswordHash = newPasswordHash;
            this.DateUpdate = DateTime.UtcNow;
            this.RefreshToken = null;
        }


        public void UpdateProfilePicture(string picture)
        {
            this.ProfilePicture = picture;
            this.DateUpdate = DateTime.UtcNow;
        }
    }
}
