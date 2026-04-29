using FinanceModule.Application.DTOs;
using FinanceModule.DBOperations;
using FinanceModule.DTOs;
using FinanceModule.Entities;
using FinanceModule.Services;
using MediatR;

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

            var tenant = await _context.Tenants.FindAsync(command.currentTenant,cancellationToken);
            if (tenant is null)
                throw new Exception("Company does not exist");


            Invoice invoice = tenant.AddInvoice(
                command.dto.Firstname,command.dto.Lastname,
                command.dto.Address,command.dto.PersonSerialNum,
                command.dto.PhoneNum,command.dto.Email,command.dto.OrderDate
            );

            foreach(InvoiceProductDto product in command.dto.Products)
            {
                invoice.AddProduct(product.Category,product.Description,product.Quantity,product.Price);
            }

            await _context.SaveChangesAsync(cancellationToken);




            InvoicePdfTemplateDto templateData = new InvoicePdfTemplateDto()
            {
                Tenant = tenant.Name,
                TenantAddress = tenant.Address,
                TenantPhoneNum = tenant.PhoneNum,
                TenantEmail = tenant.MailAddress,
                TenantFax = tenant.FaxNum,
                TenantTaxBuilding = tenant.TaxOffice,
                TenantTaxNumber = tenant.TaxNumber,
                TenantMersisNum = tenant.MersisNum,


                Firstname = command.dto.Firstname,
                Lastname = command.dto.Lastname,
                Address = command.dto.Address,
                PersonSerialNum = command.dto.PersonSerialNum,
                PhoneNum = command.dto.PhoneNum,
                Email = command.dto.Email,
                OrderDate = command.dto.OrderDate,
                InvoiceDate = DateTime.UtcNow,
               

                Products = command.dto.Products,

                SubTotal = command.dto.SubTotal,
                GrandTotal = command.dto.GrandTotal,
            };

            return _pdfService.CreatePdf(templateData);

        }
    }
}

