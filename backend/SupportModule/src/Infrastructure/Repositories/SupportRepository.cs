using Microsoft.EntityFrameworkCore;
using SupportModule.Application.DTOs;
using SupportModule.Application.Interfaces;
using SupportModule.Domain.Entites;
using SupportModule.Infrastructure.Persistence;

namespace SupportModule.Infrastructure.Repositories
{
    public class SupportRepository : ISupportRepository
    {
        private readonly SupportDbContext _supportDbContext;
        public SupportRepository(SupportDbContext supportDbContext) {
            _supportDbContext = supportDbContext;
        }

        public async Task CreateSupportRequest(SupportMessage message, SupportRequest request)
        {
            await _supportDbContext.SupportRequests.AddAsync(request);
            await _supportDbContext.SupportMessages.AddAsync(message);
            await _supportDbContext.SaveChangesAsync();
        }

        public async Task<List<SupportRequestsDto>> GetSupportRequests(int TenantId){
            var data = await _supportDbContext.SupportRequests
                .AsNoTracking()
                .Where(sr => sr.TenantId == TenantId)
                .Select(sr=>new SupportRequestsDto
                {
                    CreatedAt= sr.CreatedAt,
                    RequestId= sr.Id,
                    IsClosed=sr.IsClosed,
                    UserName= sr.UserId.ToString(),
                })
                .OrderByDescending(sr=>sr.CreatedAt)
                .ToListAsync();

            return data;
        }
        public async Task<List<SupportMessageDto>> GetSupportMessages(int RequestId){
             var data = await  _supportDbContext.SupportMessages
                .AsNoTracking()
                .Where(sm=>sm.SupportRequestId == RequestId)
                .Select(sm=>new SupportMessageDto
                {
                    Message=sm.Message,
                    CreatedAt=sm.CreatedAt,
                })
                .OrderByDescending(sm => sm.CreatedAt)
                .ToListAsync();

            return data;
        }

       
    }
}
