using SupportModule.Application.DTOs;
using SupportModule.Domain.Entities;

namespace SupportModule.Application.Interfaces
{
    public interface ISupportRepository
    {
        Task CreateSupportRequest(SupportMessage message, SupportRequest request);
        Task<List<SupportRequestsDto>> GetSupportRequests(int TenantId);
        Task<List<SupportMessageDto>> GetSupportMessages(int RequestId);
        Task<List<SupportRequestsDto>> GetMyRequest(int UserId);
        Task<List<MonthlyRequestsCountDto>> GetMonthlyRequestCountsQuery(int tenantId);
        Task<List<EmployeeDto>> GetEmployeeListQuery(int tenantId);
        Task CreateEmployeeComment(UserComment comment);
        Task<List<UserCommentDto>> GetEmployeeComments(int UserId);
        Task DeleteEmployeeComment(int CommentId);
    }
}
