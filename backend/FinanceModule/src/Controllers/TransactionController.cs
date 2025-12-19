using FinanceModule.DTOs;
using FinanceModule.Queries.Dashboard;
using FinanceModule.Services;
using MediatR;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace FinanceModule.Controllers
{
    [Route("api/finance")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        private readonly TransactionService _service;
        private readonly IMediator _mediator;

        public TransactionController(IMediator mediator, TransactionService service)
        {
            _mediator = mediator;  
            _service = service;
        }


        [HttpPost]
        public async Task<IActionResult> AddTransaction([FromBody] TransactionDTO transaction)
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
        public async Task<IActionResult> GetTransactionSummary([FromQuery] FinanceFilterDTO filters)
        {
            var result = await _mediator.Send(new TransactionsQuery(filters));
            return Ok(new
            {
                values = result.data,
                result.maxPage
            });
        }

        [HttpGet("MonthlySummary")]
        public async Task<IActionResult> GetMonthlySummary()
        {
            var data = await _mediator.Send(new MonthlySummaryQuery());
            return Ok(data);
        }

        [HttpGet("CategoricalSummary")]
        public async Task<IActionResult> GetCategoricalSummary()
        {
            var data = await _mediator.Send(new CategoricalSummaryQuery());
            return Ok(data);
        }

        [HttpGet("MostCategoricalSummary")]
        public async Task<IActionResult> GetMostCategorySummary()
        {
            var data = await _mediator.Send(new MostCategorySummaryQuery());
            return Ok(data);
        }

        [HttpGet("Installments")]
        public async Task<IActionResult> GetInstallments([FromQuery] InstallRecurFilterDTO filters)
        {
            var result = await _mediator.Send(new InstallmentsQuery(filters));
            return Ok(new {values = result.data, result.maxPage });
        }

        [HttpGet("Recurrents")]
        public async Task<IActionResult> GetRecurrents([FromQuery] InstallRecurFilterDTO filters)
        {
            var result = await _mediator.Send(new RecurrentsQuery(filters));
            return Ok(new {values = result.data, result.maxPage});
        }
    }
}
