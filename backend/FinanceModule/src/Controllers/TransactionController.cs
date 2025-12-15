using FinanceModule.Entities;
using FinanceModule.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FinanceModule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        private readonly TransactionService _service;
        public TransactionController(TransactionService service)
        {
            _service= service;
        }


        [HttpPost]
        public async Task<IActionResult> AddTransaction([FromBody] Transaction transaction)
        {
           await _service.AddAsync(transaction);
           return Ok("Transaction Saved");
        }

        [HttpGet]
        public async Task<IActionResult> GetTransactionSummary()
        {
            var data = await _service.GetAllTransactions();
            return Ok(data);
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
        public async Task<IActionResult> GetInstallments()
        {
            var data = await _service.GetInstallments();
            return Ok(data);
        }

        [HttpGet("Recurrents")]
        public async Task<IActionResult> GetRecurrents()
        {
            var data = await _service.GetRecurrents();
            return Ok(data);
        }
    }
}
