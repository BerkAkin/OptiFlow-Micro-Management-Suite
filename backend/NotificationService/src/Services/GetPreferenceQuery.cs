using Azure.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using NotificationService.Data;

namespace NotificationService.Services
{
    public record GetPreferenceQuery(int currentUser): IRequest<bool>;
    
    public class GetPreferenceQueryHandler : IRequestHandler<GetPreferenceQuery, bool>
    {
        private readonly AppDbContext _context;
        public GetPreferenceQueryHandler(AppDbContext context)
        {
            _context = context;
        }
        public async Task<bool> Handle(GetPreferenceQuery query, CancellationToken cancellationToken)
        {
            var user = await _context.Users
            .AsNoTracking() 
            .FirstOrDefaultAsync(x => x.UserId == query.currentUser, cancellationToken);
            return user?.NotificationPreference ?? true;
        }
    }
   
}
