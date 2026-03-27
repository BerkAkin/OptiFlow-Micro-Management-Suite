using MediatR;
using Microsoft.EntityFrameworkCore;
using SupportModule.Application.DTOs;
using SupportModule.Domain.Entities;
using SupportModule.Infrastructure.Persistence;

namespace SupportModule.Application.Commands.ApproveOrRejectDayOffRequestCommand
{


    public record ApproveOrRejectDayOffRequestCommand(ApproveOrRejectDto dto, int currentTenant) : IRequest<Unit>;
    public class ApproveOrRejectDayOffRequestCommandHandler : IRequestHandler<ApproveOrRejectDayOffRequestCommand, Unit>
    {
        private readonly SupportDbContext _dbContext;

        public ApproveOrRejectDayOffRequestCommandHandler(SupportDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Unit> Handle(ApproveOrRejectDayOffRequestCommand command, CancellationToken cancellationToken)
        {
            DayOff data = await _dbContext.DayOffs.SingleOrDefaultAsync(d=>d.Id == command.dto.requestId && d.TenantId==command.currentTenant, cancellationToken);

            if (data is null)
            {
                throw new Exception("Request does not exist");
            }

            data.ChangeStatus(command.dto.status);
            await _dbContext.SaveChangesAsync();

            return Unit.Value;

        }


    }

}
