using AuthModule.Application.Commands.LoginCommand;
using AuthModule.Application.Commands.RegisterCommand;
using AuthModule.Application.Commands.RequestResetPasswordCommand;
using AuthModule.Application.Commands.ResetPasswordCommand;
using AuthModule.Application.DTOs;
using AuthModule.Application.Services;
using MediatR;
using Microsoft.AspNetCore.Mvc;


namespace AuthModule.Api.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {

        private readonly RefreshTokenService _authService;
        private readonly IMediator _mediator;


        public AuthController(RefreshTokenService authService,IMediator mediator)
        {
            _authService = authService;
            _mediator = mediator;
        }


        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDTO registerDTO) {

            await _mediator.Send(new RegisterCommand(registerDTO));
            return Ok("Kullanýcý Kaydý Baþarýlý");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO loginDTO) {
     
               var res = await _mediator.Send(new LoginCommand(loginDTO));
                return Ok(res);
        }

        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken()
        {
            var newAccessToken = await _authService.RefreshToken();
            return Ok(newAccessToken);
        }


        [HttpPost("password-reset-request")]
        public async Task<IActionResult> PasswordResetRequest([FromBody] PasswordResetRequestDto passwordResetRequest)
        {
            await _mediator.Send(new PasswordRequestResetCommand(passwordResetRequest));
            return Ok("Password Renew Email Will Be Sent If Any Matching Email Has Been Found");
        }


        [HttpPost("password-reset")]
        public async Task<IActionResult> PasswordReset([FromBody] PasswordResetDto passwordReset)
        {
            await _mediator.Send(new PasswordResetCommand(passwordReset));
            return Ok("Your password has been successfully reset.");
        }

    }
}
