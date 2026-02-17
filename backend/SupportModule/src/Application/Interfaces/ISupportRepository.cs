

using SupportModule.Application.DTOs;
using SupportModule.Domain.Entites;

namespace SupportModule.Application.Interfaces
{
    public interface ISupportRepository
    {
        Task CreateSupportRequest(SupportMessage message, SupportRequest request);
        Task<List<SupportRequestsDto>> GetSupportRequests(int TenantId);
        Task<List<SupportMessageDto>> GetSupportMessages(int RequestId);
    }
}
