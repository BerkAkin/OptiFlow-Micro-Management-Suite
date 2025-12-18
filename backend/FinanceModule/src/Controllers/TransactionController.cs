using FinanceModule.DTOs;
using FinanceModule.Queries.Dashboard;
using FinanceModule.Services;
using Microsoft.AspNetCore.Mvc;

namespace FinanceModule.Controllers
{
    [Route("api/finance")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        private readonly TransactionService _service;
        private readonly TransactionsQuery _transactionsQuery;
        private readonly CategoricalSummaryQuery _categoricalQuery;
        private readonly MonthlySummaryQuery _monthlySummaryQuery;
        private readonly MostCategorySummaryQuery _mostCategorySummaryQuery;
        private readonly InstallementsQuery _installmentsQuery;
        private readonly RecurrentsQuery _recurrentsQuery;

        public TransactionController (
            TransactionService service, 
            TransactionsQuery query, 
            CategoricalSummaryQuery categoricalQuery,
            MonthlySummaryQuery monthlySummaryQuery,
            MostCategorySummaryQuery mostCategorySummaryQuery,
            InstallementsQuery installementsQuery,
            RecurrentsQuery recurrentsQuery
        )
        {
            _service = service;
            _transactionsQuery = query;
            _categoricalQuery = categoricalQuery;
            _monthlySummaryQuery = monthlySummaryQuery;
            _mostCategorySummaryQuery = mostCategorySummaryQuery;
            _installmentsQuery = installementsQuery;
            _recurrentsQuery = recurrentsQuery;
        }


        [HttpPost]
        public async Task<IActionResult> AddTransaction([FromBody] TransactionDTO transaction)
        {
           await _service.AddAsync(transaction);
           return Ok("Transaction Saved");
        }

        [HttpGet]
        public async Task<IActionResult> GetTransactionSummary([FromQuery] FinanceFilterDTO filters)
        {
            var (data, maxPage) = await _transactionsQuery.Execute(filters);
            return Ok(new
            {
                values = data,
                maxPage
            });
        }

        [HttpGet("MonthlySummary")]
        public async Task<IActionResult> GetMonthlySummary()
        {
            var data = await _monthlySummaryQuery.Execute();
            return Ok(data);
        }

        [HttpGet("CategoricalSummary")]
        public async Task<IActionResult> GetCategoricalSummary()
        {
            var data = await _categoricalQuery.Execute();
            return Ok(data);
        }

        [HttpGet("MostCategoricalSummary")]
        public async Task<IActionResult> GetMostCategorySummary()
        {
            var data = await _mostCategorySummaryQuery.Execute();
            return Ok(data);
        }

        [HttpGet("Installments")]
        public async Task<IActionResult> GetInstallments([FromQuery] InstallRecurFilterDTO filters)
        {
            var (data, maxPage) = await _installmentsQuery.Execute(filters);
            return Ok(new {values = data, maxPage });
        }

        [HttpGet("Recurrents")]
        public async Task<IActionResult> GetRecurrents([FromQuery] InstallRecurFilterDTO filters)
        {
            var (data,maxPage) = await _recurrentsQuery.Execute(filters);
            return Ok(new {values = data, maxPage});
        }
    }
}
