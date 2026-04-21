namespace AuthModule.DTO
{
    public class PasswordUpdateDto
    {
        public string OldPassword { get; set; }
        public string Password { get; set; }
        public string PasswordAgain { get; set; }
    }
}
