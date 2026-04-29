using FinanceModule.Commands.CreateInvoiceCommand;
using FinanceModule.DTOs;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using ProjectMicro.Shared.Interfaces;

namespace FinanceModule.Controllers
{
    [Route("api/invoices")]
    [ApiController]
    public class InvoiceController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly ICurrentUserService _currentUserService;

        public InvoiceController(IMediator mediator, ICurrentUserService currentUserService)
        {
            _mediator = mediator;
            _currentUserService = currentUserService;
        }


        [HttpPost]
        public async Task<IActionResult> Create([FromBody] InvoiceDto dto)
        {
            int currentTenant = _currentUserService.User.TenantId;
            var pdfBytes = await _mediator.Send(new CreateInvoiceCommand(dto, currentTenant));
            string fileName = $"Fatura_{dto.Firstname}_{dto.Lastname}_{DateTime.Now:yyyyMMdd}.pdf";
            return File(pdfBytes, "application/pdf", fileName);
        }
    }
}
