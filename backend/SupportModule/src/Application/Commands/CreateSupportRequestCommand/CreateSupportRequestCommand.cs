using MediatR;
using SupportModule.Application.DTOs;
using SupportModule.Application.Interfaces;
using SupportModule.Domain.Entites;

namespace SupportModule.Application.Commands.CreateSupportRequestCommand
{
    public record CreateSupportRequestCommand(SupportMessageDto message ,int userId, int tenantId) : IRequest<Unit>;

    public class CreateSupportRequestCommandHandler : IRequestHandler<CreateSupportRequestCommand , Unit>
    {
        private readonly ISupportRepository _repository;
        public CreateSupportRequestCommandHandler(ISupportRepository repository)
        {
            _repository = repository;
        }

        public async Task<Unit> Handle(CreateSupportRequestCommand command, CancellationToken cancellationToken)
        {

            SupportRequest spRq = new SupportRequest()
            {
                CreatedAt= DateTime.UtcNow,
                UserId= command.userId,
                TenantId=command.tenantId,
            };

            SupportMessage spMsg = new SupportMessage() { 
                CreatedAt= DateTime.UtcNow,
                Message= command.message.Message,
                SenderId= command.userId,
                SupportRequest= spRq,
            };

            await _repository.CreateSupportRequest(spMsg,spRq);
            return Unit.Value;
        }

        
    }
}
