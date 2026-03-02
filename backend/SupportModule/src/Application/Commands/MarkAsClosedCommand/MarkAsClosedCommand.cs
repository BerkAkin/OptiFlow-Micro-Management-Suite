using MediatR;
using Microsoft.EntityFrameworkCore;
using SupportModule.Domain.Entities;
using SupportModule.Infrastructure.Persistence;

namespace SupportModule.Application.Commands.MarkAsClosedCommand
{
    public record MarkAsClosedCommand(int RequestId,int TenantId) : IRequest<Unit>; 
    public class MarkAsClosedCommandHandler: IRequestHandler<MarkAsClosedCommand, Unit>  {
        private readonly SupportDbContext _context;
        public MarkAsClosedCommandHandler(SupportDbContext context) {
            _context = context;
        }
        public async Task<Unit> Handle(MarkAsClosedCommand command, CancellationToken cancellationToken) {

            SupportRequest data = await _context.SupportRequests
                .FirstOrDefaultAsync(x => x.TenantId == command.TenantId && x.Id == command.RequestId,cancellationToken);
            if (data == null)
                throw new Exception("Request is not available");

            data.CloseRequest();

            await _context.SaveChangesAsync();
            return Unit.Value;
        }
    }
}
