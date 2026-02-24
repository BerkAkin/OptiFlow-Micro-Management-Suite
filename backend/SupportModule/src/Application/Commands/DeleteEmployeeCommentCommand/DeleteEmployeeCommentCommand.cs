using MediatR;
using Microsoft.EntityFrameworkCore;
using SupportModule.Infrastructure.Persistence;

namespace SupportModule.Application.Commands.DeleteEmployeeCommentCommand
{
    public record DeleteEmployeeCommentCommand(int CommentId):IRequest<Unit>;
    public class DeleteEmployeeCommentCommandHandler : IRequestHandler<DeleteEmployeeCommentCommand, Unit>
    {
        private readonly SupportDbContext _dbContext;
        public DeleteEmployeeCommentCommandHandler(SupportDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        //Silme işlemi için de entity içinden silme yapılmalı bir de id yollamak yerine doğrudan entity bulunup silinmeli. Future Development
        public async Task<Unit> Handle(DeleteEmployeeCommentCommand command,CancellationToken cancellationToken)
        {
            var comment = await _dbContext.UserComments
            .FirstOrDefaultAsync(x => x.Id == command.CommentId, cancellationToken);

            if (comment == null)
                throw new Exception("Comment not found");

            _dbContext.UserComments.Remove(comment);

            await _dbContext.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }


}
