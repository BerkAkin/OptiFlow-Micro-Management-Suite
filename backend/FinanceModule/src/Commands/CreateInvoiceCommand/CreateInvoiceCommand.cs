using Azure.Core;
using FinanceModule.DBOperations;
using FinanceModule.DTOs;
using FinanceModule.Services;
using HandlebarsDotNet;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace FinanceModule.Commands.CreateInvoiceCommand
{
    public record CreateInvoiceCommand(InvoiceDto dto,int currentTenant) : IRequest<byte[]>;
    public class CreateInvoiceCommandHandler : IRequestHandler<CreateInvoiceCommand, byte[]>
    {

        private readonly FinanceDBContext _context;
        private readonly IPdfService _pdfService;
        public CreateInvoiceCommandHandler(FinanceDBContext context, IPdfService pdfService)
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

            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "Templates", "InvoiceTemplate.html");
            var source = await File.ReadAllTextAsync(filePath, cancellationToken);

            var template = Handlebars.Compile(source);

            var templateData = new
            {
                Tenant = tenantInfo.Tenant,
                TenantAddress = tenantInfo.TenantAddress,
                TenantPhoneNum = tenantInfo.TenantPhoneNum,
                TenantEmail = tenantInfo.TenantEmail,
                TenantFax = tenantInfo.TenantFax,
                TenantTaxBuilding = tenantInfo.TenantTaxBuilding,
                TenantTaxNumber = tenantInfo.TenantTaxNumber,
                TenantMersisNum = tenantInfo.TenantMersisNum,


                firstname = command.dto.Firstname,
                lastname = command.dto.Lastname,
                address = command.dto.Address,
                personserialnum = command.dto.PersonSerialNum,
                phoneNum = command.dto.PhoneNum,
                email = command.dto.Email,

                InvoiceDate = DateTime.Now.ToString("dd.MM.yyyy HH:mm"),
                OrderDate = command.dto.InvoiceDate, 

                products = command.dto.Products.Select(p => new {
                    category = p.Category,
                    description = p.Description,
                    quantity = p.Quantity,
                    price = p.Price.ToString("N2"), 
                    lineTotal = p.LineTotal.ToString("N2")
                }),

                subTotal = command.dto.SubTotal.ToString("N2"),
                taxRate = command.dto.TaxRate,
                grandTotal = command.dto.GrandTotal.ToString("N2")
            };
            var finalHtml = template(templateData);
            return await _pdfService.CreatePdf(finalHtml);

        }
    }
}

