using FinanceModule.DTOs;
using FinanceModule.Queries.Dashboard;
using FinanceModule.Services;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using ProjectMicro.Shared.Interfaces;

namespace FinanceModule.Controllers
{
    [Route("api/transactions")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly ICurrentUserService _currentUserService;

        public TransactionController(IMediator mediator, ICurrentUserService currentUserService)
        {
            _mediator = mediator;  
            _currentUserService = currentUserService;
        }


        [HttpPost]
        public async Task<IActionResult> Create([FromBody] TransactionDTO transaction)
        {
                int currentTenant = _currentUserService.User.TenantId;
                await _mediator.Send(new CreateTransactionCommand(transaction,currentTenant));
                return Ok("Transaction Saved");
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] FinanceFilterDTO filters)
        {
            int currentTenant = _currentUserService.User.TenantId;
            var result = await _mediator.Send(new GetTransactionsQuery(filters,currentTenant));
            return Ok(new
            {
                values = result.data,
                result.maxPage
            });
        }

        [HttpGet("summaries/monthly")]
        public async Task<IActionResult> GetMonthly()
        {
            int currentTenant = _currentUserService.User.TenantId;
            var data = await _mediator.Send(new GetMonthlyQuery(currentTenant));
            return Ok(data);
        }

        [HttpGet("summaries/categorical")]
        public async Task<IActionResult> GetCategorical()
        {
            int currentTenant = _currentUserService.User.TenantId;
            var data = await _mediator.Send(new GetCategoricalQuery(currentTenant));
            return Ok(data);
        }

        [HttpGet("summaries/most")]
        public async Task<IActionResult> GetMost()
        {
            int currentTenant = _currentUserService.User.TenantId;
            var data = await _mediator.Send(new GetMostQuery(currentTenant));
            return Ok(data);
        }

        [HttpGet("installments")]
        public async Task<IActionResult> GetInstallments([FromQuery] InstallRecurFilterDTO filters)
        {
            int currentTenant = _currentUserService.User.TenantId;
            var result = await _mediator.Send(new InstallmentsQuery(filters, currentTenant));
            return Ok(new {values = result.data, result.maxPage });
        }

        [HttpGet("recurrents")]
        public async Task<IActionResult> GetRecurrents([FromQuery] InstallRecurFilterDTO filters)
        {
            int currentTenant = _currentUserService.User.TenantId;
            var result = await _mediator.Send(new GetRecurrentsQuery(filters,currentTenant));
            return Ok(new {values = result.data, result.maxPage});
        }

        
    }
}
