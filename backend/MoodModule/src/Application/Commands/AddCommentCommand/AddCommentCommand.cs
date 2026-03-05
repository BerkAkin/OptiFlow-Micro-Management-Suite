using MediatR;
using Microsoft.EntityFrameworkCore;
using MoodModule.Application.DTOs;
using MoodModule.Domain.Entities;
using MoodModule.Infrastructure.Persistence;

namespace MoodModule.Application.Commands.AddCommentCommand
{
    public record AddCommentCommand(AddCommentDto comment,int TenantId):IRequest<Unit> ;
    public class AddCommentCommandHandler: IRequestHandler<AddCommentCommand, Unit>
    {
        private readonly MoodDbContext _dbContext;
        public AddCommentCommandHandler(MoodDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Unit> Handle(AddCommentCommand command,CancellationToken cancellationToken) {

            MiniUser user = await _dbContext.Users.SingleOrDefaultAsync(u=>u.Id==command.comment.UserId && u.TenantId== command.TenantId, cancellationToken);
            if (user is null) {
                throw new Exception("User does not exists");
            }
            user.AddComment(command.comment.Content);

            await _dbContext.SaveChangesAsync();

            return Unit.Value;
        }
    }
}
