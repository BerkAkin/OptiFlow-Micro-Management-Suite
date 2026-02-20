using Microsoft.EntityFrameworkCore;
using SupportModule.Application.DTOs;
using SupportModule.Application.Interfaces;
using SupportModule.Domain.Entities;
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
                .Where(sr => sr.TenantId == TenantId).Include(sr=>sr.User)
                .Select(sr=>new SupportRequestsDto
                {
                    CreatedAt= sr.CreatedAt,
                    Id= sr.Id,
                    IsClosed=sr.IsClosed,
                    UserName= sr.User.Username,
                    Category= sr.Category,
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

        public async Task<List<SupportRequestsDto>> GetMyRequest(int UserId)
        {
            var data = await _supportDbContext.SupportRequests
                .AsNoTracking()
                .Where(sr => sr.UserId == UserId)
                .Select(sr => new SupportRequestsDto
                {
                    Id= sr.Id,
                    IsClosed = sr.IsClosed,
                    CreatedAt = sr.CreatedAt,
                    UserName= sr.User.Username,
                    Category= sr.Category,
                })
                .OrderByDescending(sr=>sr.CreatedAt)
                .ToListAsync();
            return data;
        }

        public async Task<List<MonthlyRequestsCountDto>> GetMonthlyRequestCountsQuery(int tenantId)
        {
            var year = DateTime.UtcNow.Year;

            var data = await _supportDbContext.SupportRequests
                .AsNoTracking()
                .Where(sr => sr.CreatedAt.Year == year)
                .GroupBy(sr => sr.CreatedAt.Month)
                .Select(g => new MonthlyRequestsCountDto
                {
                    Month = g.Key,
                    Count = g.Count()
                })
                .OrderBy(x => x.Month)
                .ToListAsync();

            return data;
        }

        public async Task<List<EmployeeDto>> GetEmployeeListQuery(int tenantId)
        {
            var data = await _supportDbContext.Users
                .AsNoTracking()
                .Where(u => u.TenantId == tenantId)
                .Select(u => new EmployeeDto
                {
                      UserId= u.Id,
                      Username= u.Username
                })
                .ToListAsync();
            return data;
                
        }

        //benzer işlevlere sahip endpointler kombine hale getirilip birleştirilmeli. Future optimization
        public async Task CreateEmployeeComment(UserComment comment)
        {
            await _supportDbContext.UserComments.AddAsync(comment);
            await _supportDbContext.SaveChangesAsync();
        }

        public async Task<List<UserCommentDto>> GetEmployeeComments(int UserId)
        {
            var data = await _supportDbContext.UserComments
                .AsNoTracking()
                .Where(u => u.UserId == UserId)
                .Select(uc=>new UserCommentDto
                {
                    UserId= uc.UserId,
                    Comment= uc.Comment
                })
                .ToListAsync();
            return data;    
        }

        
        public async Task DeleteEmployeeComment(int CommentId)
        {
            var data = await _supportDbContext.UserComments.FindAsync(CommentId);
            if (data is null)
                throw new Exception("Yorum bulunamadı");

            _supportDbContext.UserComments.Remove(data);
            await _supportDbContext.SaveChangesAsync();
        }


        //DATETIME BİLGİLERİ İÇİN HELPER YAZILMALI

        public async Task<List<CategoricalRequestDto>> GetRequestsCategorical(int TenantId)
        {
            int currentYear = DateTime.Now.Year; 
            var data = await _supportDbContext.SupportRequests
                .AsNoTracking()
                .Where(rc => rc.TenantId == TenantId && rc.CreatedAt.Year == currentYear)
                .GroupBy(rc => rc.Category)
                .Select(grc => new CategoricalRequestDto
                {
                    Category= grc.Key,
                    Count= grc.Count()
                })
                .ToListAsync();

            return data;
        }


    }
}
