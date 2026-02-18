using MediatR;
using SupportModule.Application.Interfaces;

namespace SupportModule.Application.Commands.DeleteEmployeeCommentCommand
{
    public record DeleteEmployeeCommentCommand(int CommentId):IRequest<Unit>;
    public class DeleteEmployeeCommentCommandHandler : IRequestHandler<DeleteEmployeeCommentCommand, Unit>
    {
        private readonly ISupportRepository _supportRepository;
        public DeleteEmployeeCommentCommandHandler(ISupportRepository supportRepository)
        {
            _supportRepository = supportRepository;
        }

        //Silme işlemi için de entity içinden silme yapılmalı bir de id yollamak yerine doğrudan entity bulunup silinmeli. Future Development
        public async Task<Unit> Handle(DeleteEmployeeCommentCommand command,CancellationToken cancellationToken)
        {
            await _supportRepository.DeleteEmployeeComment(command.CommentId);
            return Unit.Value;
        }
    }


}
