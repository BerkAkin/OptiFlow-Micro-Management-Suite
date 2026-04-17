using AuthModule.Data;
using AuthModule.DTO;
using AuthModule.Interfaces;
using AuthModule.Services;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.AspNetCore.Mvc;
using ProjectMicro.Shared.Interfaces;
using ProjectMicro.Shared.Services;


namespace AuthModule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {



        private readonly AuthDBContext _context;
        private readonly AuthService _authService;
        private readonly IStorageService _storageService;
        private readonly IMediator _mediator;
        private readonly ICurrentUserService _currentUserService;


        public AuthController(AuthDBContext context, 
            AuthService authService, 
            IStorageService storageService ,
            IMediator mediator, 
            ICurrentUserService currentUserService)
        {
            _context = context;
            _authService = authService;
            _storageService = storageService;
            _mediator = mediator;
            _currentUserService = currentUserService;
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


        [HttpPost("upload-avatar")]
        public async Task<IActionResult> UploadAvatar(IFormFile file)
        {
            int currentUser = _currentUserService.User.UserId;
            if (file == null || file.Length == 0) return BadRequest("Dosya boþ.");
            var savedFileName = await _storageService.UploadFileAsync(file);

            var result = await _mediator.Send(new UpdateProfilePictureCommand(currentUser, savedFileName));
            return Ok(new { FileName = savedFileName });
        }

        [HttpGet("profile-picture/{fileName}")]
        public async Task<IActionResult> GetProfilePicture(string fileName)
        {
            try
            {
                var stream = await _storageService.GetFileStreamAsync(fileName, "user-profiles");
                return File(stream, "image/jpeg");
            }
            catch { return NotFound(); }
        }

    }
}
