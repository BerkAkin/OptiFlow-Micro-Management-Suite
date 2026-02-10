using AuthModule.Data;
using AuthModule.DTO;
using AuthModule.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace AuthModule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {



        private readonly AuthDBContext _context;
        private readonly AuthService _authService;



        public AuthController(AuthDBContext context, AuthService authService)
        {
            _context = context;
            _authService = authService;
        }


        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDTO registerDTO) {

            await _authService.Register(registerDTO);
            return Ok("Kullanýcý Kaydý Baþarýlý");
        }




        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO loginDTO) {
     
               var res = await _authService.Login(loginDTO);
                return Ok(res);
            
           
        }




        [HttpPost("refreshToken")]
        public async Task<IActionResult> RefreshToken()
        {

            var newAccessToken = await _authService.RefreshToken();
            return Ok(newAccessToken);
        }
       


    }
}
