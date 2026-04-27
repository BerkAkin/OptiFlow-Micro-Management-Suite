using FinanceModule.DTOs;
using FinanceModule.Queries.Dashboard;
using FinanceModule.Services;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using ProjectMicro.Shared.Interfaces;

namespace FinanceModule.Controllers
{
    [Route("api/transactions")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        private readonly TransactionService _service;
        private readonly IMediator _mediator;
        private readonly ICurrentUserService _currentUserService;

        public TransactionController(IMediator mediator, TransactionService service, ICurrentUserService currentUserService)
        {
            _mediator = mediator;  
            _service = service;
            _currentUserService = currentUserService;
        }


        [HttpPost]
        public async Task<IActionResult> Create([FromBody] TransactionDTO transaction)
        {
            try
            {
                await _service.AddAsync(transaction);
                return Ok("Transaction Saved");
            }
            catch(ValidationException exception)
            {
                var errorMessages = exception.Errors.Select(e => new {
                    Property = e.PropertyName,
                    Message = e.ErrorMessage
                });

                return BadRequest(new { Errors = errorMessages });
            }
          
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] FinanceFilterDTO filters)
        {
            var result = await _mediator.Send(new TransactionsQuery(filters));
            return Ok(new
            {
                values = result.data,
                result.maxPage
            });
        }

        [HttpGet("summaries/monthly")]
        public async Task<IActionResult> GetMonthly()
        {
            var data = await _mediator.Send(new MonthlySummaryQuery());
            return Ok(data);
        }

        [HttpGet("summaries/categorical")]
        public async Task<IActionResult> GetCategorical()
        {
            var data = await _mediator.Send(new CategoricalSummaryQuery());
            return Ok(data);
        }

        [HttpGet("summaries/most")]
        public async Task<IActionResult> GetMost()
        {
            var data = await _mediator.Send(new MostCategorySummaryQuery());
            return Ok(data);
        }

        [HttpGet("installments")]
        public async Task<IActionResult> GetInstallments([FromQuery] InstallRecurFilterDTO filters)
        {
            var result = await _mediator.Send(new InstallmentsQuery(filters));
            return Ok(new {values = result.data, result.maxPage });
        }

        [HttpGet("recurrents")]
        public async Task<IActionResult> GetRecurrents([FromQuery] InstallRecurFilterDTO filters)
        {
            var result = await _mediator.Send(new RecurrentsQuery(filters));
            return Ok(new {values = result.data, result.maxPage});
        }

        
    }
}
