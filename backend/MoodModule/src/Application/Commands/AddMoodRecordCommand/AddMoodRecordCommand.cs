using MediatR;
using Microsoft.EntityFrameworkCore;
using MoodModule.Application.DTOs;
using MoodModule.Domain.Entities;
using MoodModule.Infrastructure.Persistence;

namespace MoodModule.Application.Commands.AddMoodRecordCommand
{
    public record AddMoodRecordCommand(AddMoodRecordDto mood,int UserId,int TenantId): IRequest<Unit>;
    public class AddMoodRecordCommandHandler : IRequestHandler<AddMoodRecordCommand, Unit>
    {
        private readonly MoodDbContext _dbContext;
        public AddMoodRecordCommandHandler(MoodDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Unit> Handle(AddMoodRecordCommand command,CancellationToken cancellationToken) {
            MiniUser user = await _dbContext.Users
                 .SingleOrDefaultAsync(u => u.Id == command.UserId && u.TenantId == command.TenantId,cancellationToken);
            if (user == null) 
                throw new Exception("User is not exists");

            user.AddMoodRecord(command.mood.MoodId, command.mood.Tags);
            await _dbContext.SaveChangesAsync();
            return Unit.Value;
        }
    }
}
