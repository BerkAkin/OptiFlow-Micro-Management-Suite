using Microsoft.AspNetCore.Mvc;

namespace MicroFinanceModule.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MicroFinanceModuleController : ControllerBase
    {
        [HttpGet("GetTemp")]
        public IActionResult GetSome()
        {
            return Ok(213);
        }
    }
}
