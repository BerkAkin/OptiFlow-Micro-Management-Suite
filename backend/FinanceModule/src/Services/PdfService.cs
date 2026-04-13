using FinanceModule.Entities;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;


namespace FinanceModule.Services
{
    public class PdfService
    {
        public byte[] CreatePdf(InvoicePrintModel model)
        {
            QuestPDF.Settings.License = LicenseType.Community;

            return Document.Create(container =>
            {
                container.Page(page =>
                {
                    page.Margin(1.5f, Unit.Centimetre);
                    page.PageColor(Colors.White);
                    page.DefaultTextStyle(x => x.FontSize(10).FontFamily(Fonts.Verdana).FontColor("#4b5563"));

                    page.Header().BorderBottom(1).BorderColor("#e5e7eb").PaddingBottom(10).Row(row =>
                    {
                        row.RelativeItem().Text(model.Tenant)
                            .FontSize(30).Light().FontColor("#4b5563");

                        row.RelativeItem().AlignRight().Text("FATURA")
                            .FontSize(24).Light().FontColor("#4b5563");
                    });

                    page.Content().PaddingTop(10).Column(col =>
                    {
                        col.Item().AlignRight().Text(text =>
                        {
                            text.DefaultTextStyle(x => x.FontSize(9).FontColor("#6b7280"));
                            text.Line($"Fatura Tarihi ve Saati: {model.InvoiceDate:dd.MM.yyyy HH:mm}").SemiBold().FontColor("#000");
                            text.Line($"Sipariş Tarihi ve Saati: {model.OrderDate:dd.MM.yyyy HH:mm}").SemiBold().FontColor("#000");
                        });

                        col.Item().PaddingTop(20).BorderTop(2).BorderBottom(2).BorderColor("#374151").Row(row =>
                        {
                            row.RelativeItem().PaddingRight(20).PaddingVertical(10).Column(c =>
                            {
                                c.Item().Text(model.Tenant).Bold().FontColor("#374151");
                                c.Item().Text(t => { t.Span("Merkez: ").Bold().FontColor("#374151"); t.Span(model.TenantAddress); });
                                c.Item().Text($"Tel: {model.TenantPhoneNum} | Fax: {model.TenantFax}");
                                c.Item().Text($"E-Posta: {model.TenantEmail}");
                                c.Item().Text($"Vergi Dairesi: {model.TenantTaxBuilding} | VKN: {model.TenantTaxNumber}");
                                c.Item().Text($"Mersis: {model.TenantMersisNum}");
                            });

                            row.RelativeItem().PaddingLeft(20).PaddingVertical(10).Column(c =>
                            {
                                c.Item().Text("SAYIN").Bold().FontColor("#374151");
                                c.Item().Text($"{model.Firstname} {model.Lastname}");
                                c.Item().Text(model.Address);
                                c.Item().Text($"TC/Seri No: {model.PersonSerialNum}");
                                c.Item().Text($"Tel: {model.PhoneNum} | E-Posta: {model.Email}");
                            });
                        });

                        col.Item().PaddingTop(30).Table(table =>
                        {
                            table.ColumnsDefinition(columns =>
                            {
                                columns.RelativeColumn(2);
                                columns.RelativeColumn(4);
                                columns.RelativeColumn(1);
                                columns.RelativeColumn(2); 
                                columns.RelativeColumn(2); 
                            });

                            table.Header(header =>
                            {
                                header.Cell().Element(HeaderStyle).Text("Kategori");
                                header.Cell().Element(HeaderStyle).Text("Açıklama");
                                header.Cell().Element(HeaderStyle).AlignCenter().Text("Miktar");
                                header.Cell().Element(HeaderStyle).AlignCenter().Text("Fiyat");
                                header.Cell().Element(HeaderStyle).AlignCenter().Text("Tutar");

                                static IContainer HeaderStyle(IContainer c) =>
                                    c.Background("#d1d5db").Padding(8).AlignCenter();
                            });

                            foreach (var item in model.Products)
                            {
                                table.Cell().Element(CellStyle).Text(item.Category);
                                table.Cell().Element(CellStyle).Text(item.Description);
                                table.Cell().Element(CellStyle).AlignCenter().Text(item.Quantity.ToString());
                                table.Cell().Element(CellStyle).AlignCenter().Text($"{item.Price:N2} ₺");
                                table.Cell().Element(CellStyle).AlignCenter().Text($"{item.LineTotal:N2} ₺");

                                static IContainer CellStyle(IContainer c) =>
                                    c.BorderBottom(1).BorderColor("#e5e7eb").Padding(8);
                            }
                        });
                        col.Item().PaddingTop(20).Row(row =>
                        {
                            row.RelativeItem(4).Padding(40).Text("KAŞE İMZA").Bold().FontColor("#374151");

                            row.RelativeItem(2).AlignRight().Column(tCol =>
                            {
                                tCol.Item().PaddingBottom(5).Text(t => {
                                    t.Span("Toplam: ").FontColor("#6b7280");
                                    t.Span($"{model.SubTotal:N2} ₺").Bold().FontColor("#000");
                                });
                                tCol.Item().PaddingBottom(5).Text(t => {
                                    t.Span("KDV % : ").FontColor("#6b7280");
                                    t.Span(model.TaxRate.ToString()).Bold().FontColor("#000");
                                });
                                tCol.Item().Text(t => {
                                    t.Span("Genel Toplam: ").FontColor("#6b7280").FontSize(12);
                                    t.Span($"{model.GrandTotal:N2} ₺").Bold().FontColor("#000").FontSize(12);
                                });
                            });
                        });
                    });

                    page.Footer().AlignCenter().Text(x =>
                    {
                        x.Span("Sayfa ");
                        x.CurrentPageNumber();
                    });
                });
            }).GeneratePdf();
        }
    }
}
