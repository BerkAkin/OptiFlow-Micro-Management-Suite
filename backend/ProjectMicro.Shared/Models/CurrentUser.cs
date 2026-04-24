namespace ProjectMicro.Shared.Models;

public class CurrentUser
{
    public int UserId { get; set; }
    public int TenantId { get; set; }
    public int DepartmentId { get; set; }
    public string Company { get; set; }
}