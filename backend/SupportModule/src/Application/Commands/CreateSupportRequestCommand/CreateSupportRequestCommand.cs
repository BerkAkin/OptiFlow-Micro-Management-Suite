using MediatR;
using SupportModule.Application.DTOs;
using SupportModule.Domain.Entities;
using SupportModule.Infrastructure.Persistence;

namespace SupportModule.Application.Commands.CreateSupportRequestCommand
{
    public record CreateSupportRequestCommand(CreateSupportRequestDto supportRequestDto ,int userId, int tenantId) : IRequest<Unit>;

    public class CreateSupportRequestCommandHandler : IRequestHandler<CreateSupportRequestCommand , Unit>
    {
        private readonly SupportDbContext _dbContext;
        public CreateSupportRequestCommandHandler(SupportDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Unit> Handle(CreateSupportRequestCommand command, CancellationToken cancellationToken)
        {

            SupportRequest spRq = new SupportRequest(command.userId, command.tenantId, command.supportRequestDto.Category);

            spRq.AddMessage(command.supportRequestDto.Content,spRq.UserId);

            await _dbContext.SupportRequests.AddAsync(spRq, cancellationToken);
            await _dbContext.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }

        
    }
}
