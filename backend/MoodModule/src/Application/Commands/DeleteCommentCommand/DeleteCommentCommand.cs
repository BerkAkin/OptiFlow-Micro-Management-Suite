using MediatR;
using Microsoft.EntityFrameworkCore;
using MoodModule.Domain.Entities;
using MoodModule.Infrastructure.Persistence;

namespace MoodModule.Application.Commands.DeleteCommentCommand
{

    public record DeleteCommentCommand(int commentId, int userId, int TenantId) : IRequest<Unit>;
    public class DeleteCommentCommandHandler : IRequestHandler<DeleteCommentCommand, Unit>
    {
        private readonly MoodDbContext _dbContext;
        public DeleteCommentCommandHandler(MoodDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Unit> Handle(DeleteCommentCommand command, CancellationToken cancellationToken)
        {

            MiniUser user = await _dbContext.Users
                .Include(u => u.Comments)
                .SingleOrDefaultAsync(u => u.Id == command.userId && u.TenantId == command.TenantId, cancellationToken);
            if (user is null)
            {
                throw new Exception("User does not exists");
            }
            user.RemoveComment(command.commentId);

            await _dbContext.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
