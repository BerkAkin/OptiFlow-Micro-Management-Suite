using FinanceModule.DTOs;
using FinanceModule.Entities;
using FinanceModule.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FinanceModule.Controllers
{
    [Route("api/finance")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        private readonly TransactionService _service;
        public TransactionController(TransactionService service)
        {
            _service= service;
        }


        [HttpPost]
        public async Task<IActionResult> AddTransaction([FromBody] TransactionViewModel transaction)
        {
           await _service.AddAsync(transaction);
           return Ok("Transaction Saved");
        }

        [HttpGet]
        public async Task<IActionResult> GetTransactionSummary([FromQuery] FinanceFilterDto filters)
        {
            var (data, maxPage) = await _service.GetAllTransactions(filters);
            return Ok(new
            {
                values = data,
                maxPage
            });
        }

        [HttpGet("MonthlySummary")]
        public async Task<IActionResult> GetMonthlySummary()
        {
            var data = await _service.GetMonthlySummary();
            return Ok(data);
        }

        [HttpGet("CategoricalSummary")]
        public async Task<IActionResult> GetCategoricalSummary()
        {
            var data = await _service.GetCategoricalSummary();
            return Ok(data);
        }

        [HttpGet("MostCategoricalSummary")]
        public async Task<IActionResult> GetMostCategorySummary()
        {
            var data = await _service.GetMostCategorySummary();
            return Ok(data);
        }

        [HttpGet("Installments")]
        public async Task<IActionResult> GetInstallments([FromQuery] InstallRecurFilterDto filters)
        {
            var (data, maxPage) = await _service.GetInstallments(filters);
            return Ok(new {values = data, maxPage });
        }

        [HttpGet("Recurrents")]
        public async Task<IActionResult> GetRecurrents([FromQuery] InstallRecurFilterDto filters)
        {
            var (data,maxPage) = await _service.GetRecurrents(filters);
            return Ok(new {values = data, maxPage});
        }
    }
}
