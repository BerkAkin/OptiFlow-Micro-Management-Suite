using MediatR;
using Microsoft.EntityFrameworkCore;
using SupportModule.Application.DTOs;
using SupportModule.Domain.Entities;
using SupportModule.Infrastructure.Persistence;

namespace SupportModule.Application.Commands.SendMessageCommand
{
    public record SendMessageCommand(SendMessageDto message, int UserId) : IRequest<Unit>;
    public class SendMessageCommandHandler : IRequestHandler<SendMessageCommand,Unit>
    {
        private readonly SupportDbContext _dbContext;
        public SendMessageCommandHandler(SupportDbContext dbContext) {
            _dbContext = dbContext;
        }

        public async Task<Unit> Handle(SendMessageCommand command, CancellationToken cancellationToken) {

            SupportRequest request = await _dbContext.SupportRequests
                .FirstOrDefaultAsync(sr => sr.Id == command.message.RequestId, cancellationToken);

            if (request == null)
                throw new Exception("Request not found");

            request.AddMessage(command.message.Message, command.UserId);

            await _dbContext.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        
        }
    }
}
