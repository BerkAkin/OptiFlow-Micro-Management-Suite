using MediatR;
using Microsoft.EntityFrameworkCore;
using SupportModule.Application.DTOs;
using SupportModule.Infrastructure.Persistence;

namespace SupportModule.Application.Commands.CreateEmployeeCommentCommand
{
    public record CreateEmployeeCommentCommand(UserCommentDto comment): IRequest<Unit>;

    public class CreateEmployeeCommentCommandHandler: IRequestHandler<CreateEmployeeCommentCommand,Unit> {

        private readonly SupportDbContext _dbContext;
        public CreateEmployeeCommentCommandHandler(SupportDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<Unit> Handle(CreateEmployeeCommentCommand command, CancellationToken cancellationToken) {

            var user = await _dbContext.Users.FirstOrDefaultAsync(x => x.Id == command.comment.UserId,cancellationToken);
            if (user == null)
                throw new Exception("User is not exist");

            user.AddComment(command.comment.Comment);

            await _dbContext.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
//employee listin alındığı zamanda employee entity içindeki comments bağlantısı içinde değişiklik yapılarak optimize edilmeli entityler bucket of proptan çıkartılmalı. Future optimization
