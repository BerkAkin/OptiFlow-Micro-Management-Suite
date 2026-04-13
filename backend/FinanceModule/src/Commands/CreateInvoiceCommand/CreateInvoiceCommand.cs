using Azure.Core;
using FinanceModule.DBOperations;
using FinanceModule.DTOs;
using FinanceModule.Entities;
using FinanceModule.Services;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace FinanceModule.Commands.CreateInvoiceCommand
{
    public record CreateInvoiceCommand(InvoiceDto dto,int currentTenant) : IRequest<byte[]>;
    public class CreateInvoiceCommandHandler : IRequestHandler<CreateInvoiceCommand, byte[]>
    {

        private readonly FinanceDBContext _context;
        private readonly PdfService _pdfService;
        public CreateInvoiceCommandHandler(FinanceDBContext context, PdfService pdfService)
        {
            _context = context;
            _pdfService = pdfService;
        }

        public async Task<byte[]> Handle(CreateInvoiceCommand command, CancellationToken cancellationToken)
        {

            var tenantInfo =await _context.Tenants.AsNoTracking()
                .Where(x => x.TenantId == command.currentTenant)
                .Select(x => new
                {
                    Tenant = x.Name,
                    TenantAddress = x.Address,
                    TenantPhoneNum = x.PhoneNum,
                    TenantEmail =x.MailAddress,
                    TenantFax = x.FaxNum,
                    TenantTaxBuilding = x.TaxOffice,
                    TenantTaxNumber = x.TaxNumber,
                    TenantMersisNum = x.MersisNum,

                }).FirstOrDefaultAsync(cancellationToken);


            if (tenantInfo == null)
                throw new Exception("Şirket bilgileri bulunamadı.");

            var templateData = new InvoicePrintModel
            {
                Tenant = tenantInfo.Tenant,
                TenantAddress = tenantInfo.TenantAddress,
                TenantPhoneNum = tenantInfo.TenantPhoneNum,
                TenantEmail = tenantInfo.TenantEmail,
                TenantFax = tenantInfo.TenantFax,
                TenantTaxBuilding = tenantInfo.TenantTaxBuilding,
                TenantTaxNumber = tenantInfo.TenantTaxNumber,
                TenantMersisNum = tenantInfo.TenantMersisNum,


                Firstname = command.dto.Firstname,
                Lastname = command.dto.Lastname,
                Address = command.dto.Address,
                PersonSerialNum = command.dto.PersonSerialNum,
                PhoneNum = command.dto.PhoneNum,
                Email = command.dto.Email,
                OrderDate = DateTime.TryParse(command.dto.OrderDate, out DateTime result) ? result:DateTime.UtcNow,
                InvoiceDate = command.dto.InvoiceDate,
                

                Products = command.dto.Products,

                SubTotal = command.dto.SubTotal,
                TaxRate = command.dto.TaxRate,
                GrandTotal = command.dto.GrandTotal,
            };
            return _pdfService.CreatePdf(templateData);

        }
    }
}

