using PuppeteerSharp;
using PuppeteerSharp.Media;

namespace FinanceModule.Services
{

    public interface IPdfService
    {
        Task<byte[]> CreatePdf(string htmlContent);
    }

    public class PdfService : IPdfService
    {
        public async Task<byte[]> CreatePdf(string htmlContent)
        {
            var browserFetcher = new BrowserFetcher();
            await browserFetcher.DownloadAsync();

            var launchOptions = new LaunchOptions
            {
                Headless = true,
                Args = new[] {
                "--no-sandbox",
                "--disable-setuid-sandbox",
                "--disable-dev-shm-usage"
            }
            };

            await using var browser = await Puppeteer.LaunchAsync(launchOptions);
            await using var page = await browser.NewPageAsync();
            await page.SetContentAsync(htmlContent);

            return await page.PdfDataAsync(new PdfOptions
            {
                Format = PaperFormat.A4,
                PrintBackground = true,
                MarginOptions = new MarginOptions { Top = "20px", Bottom = "20px" }
            });
        }
    }
}
