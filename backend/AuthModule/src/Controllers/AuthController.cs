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




        [HttpPost("PasswordUpdate")]

        public async Task<IActionResult> PasswordUpdate([FromBody] PasswordUpdateDto passwordUpdate)
        {
            var currenUser = _currentUserService.User.UserId;
            await _mediator.Send(new UpdatePasswordCommand(currenUser,passwordUpdate));

            return Ok("Password Updated Successfully");
        }



        [HttpPost("PasswordResetRequester")]

        public async Task<IActionResult> PasswordResetRequester([FromBody] PasswordResetRequestDto passwordResetRequest)
        {
            await _mediator.Send(new PasswordRequestResetCommand(passwordResetRequest));
            return Ok("Password Renew Email Will Be Sent If Any Matching Email Has Been Found");
        }


        [HttpPost("PasswordReset")]

        public async Task<IActionResult> PasswordReset([FromBody] PasswordResetDto passwordReset)
        {
            await _mediator.Send(new PasswordResetCommand(passwordReset));
            return Ok("Your password has been successfully reset.");
        }
    }
}
