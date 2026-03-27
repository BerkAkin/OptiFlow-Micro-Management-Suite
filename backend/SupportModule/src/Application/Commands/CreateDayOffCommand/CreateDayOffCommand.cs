using MediatR;
using Microsoft.EntityFrameworkCore;
using SupportModule.Application.DTOs;
using SupportModule.Infrastructure.Persistence;


namespace SupportModule.Application.Commands.CreateDayOffCommand
{
    public record CreateDayOffCommand(int tenantId, int userId, CreateDayOffDto dto) : IRequest<Unit>;
    public class CreateDayOffCommandHandler : IRequestHandler<CreateDayOffCommand, Unit>
    {
        private readonly SupportDbContext _dbContext;

        public CreateDayOffCommandHandler(SupportDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Unit> Handle(CreateDayOffCommand command, CancellationToken cancellationToken)
        {
            var user = await _dbContext.Users
                .Include(u => u.DayOffs)
                .SingleOrDefaultAsync(u => u.TenantId == command.tenantId && u.Id == command.userId, cancellationToken);
                
            if (user is null) {
                throw new Exception("User does not exist");
            }

            user.AddDayOff(command.dto.Topic, command.dto.Description,command.dto.Days,command.dto.StartingDate);
            await _dbContext.SaveChangesAsync();
             
            return Unit.Value;

        }


    }


}
