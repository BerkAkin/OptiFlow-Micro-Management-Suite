using MediatR;
using SupportModule.Application.DTOs;
using SupportModule.Application.Interfaces;
using SupportModule.Domain.Entities;

namespace SupportModule.Application.Commands.CreateEmployeeCommentCommand
{
    public record CreateEmployeeCommentCommand(UserCommentDto comment): IRequest<Unit>;

    public class CreateEmployeeCommentCommandHandler: IRequestHandler<CreateEmployeeCommentCommand,Unit> {
        private readonly ISupportRepository _supportRepository;
        public CreateEmployeeCommentCommandHandler(ISupportRepository supportRepository)
        {
            _supportRepository = supportRepository;
        }
        //employee listin alındığı zamanda employee entity içindeki comments bağlantısı içinde değişiklik yapılarak optimize edilmeli entityler bucket of proptan çıkartılmalı. Future optimization
        public async Task<Unit> Handle(CreateEmployeeCommentCommand command, CancellationToken cancellationToken) {

            UserComment userComment = new UserComment()
            {
                Comment= command.comment.Comment,
                UserId= command.comment.UserId
            };

            await _supportRepository.CreateEmployeeComment(userComment);
            return Unit.Value;
        }
    }
}
