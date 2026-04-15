using MediatR;
using Microsoft.EntityFrameworkCore;
using NotificationService.Data;

namespace NotificationService.Services
{
    public record UpdatePreferenceCommand(int currentUserId) : IRequest<Unit>;

    public class UpdatePreferenceCommandHandler : IRequestHandler<UpdatePreferenceCommand, Unit>
    {
        private readonly AppDbContext _context;

        public UpdatePreferenceCommandHandler(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(UpdatePreferenceCommand request, CancellationToken cancellationToken)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x=>x.UserId == request.currentUserId);

            if (user == null)
            {
                throw new Exception("User does not exist");
            }
            user.NotificationPreference = !user.NotificationPreference;
            await _context.SaveChangesAsync(cancellationToken);
            return Unit.Value;

        }
    }
}
