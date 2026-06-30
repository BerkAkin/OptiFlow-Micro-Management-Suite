using AuthModule.Application.Commands.ChangeAccountStatusCommand;
using AuthModule.Application.Commands.ChangePasswordCommand;
using AuthModule.Application.Commands.ChangeProfilePictureCommand;
using AuthModule.Application.DTOs;
using AuthModule.Application.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using ProjectMicro.Shared.Interfaces;

namespace AuthModule.Api.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UsersController : ControllerBase
    {

        private readonly IStorageService _storageService;
        private readonly IMediator _mediator;
        private readonly ICurrentUserService _currentUserService;


        public UsersController(
            IStorageService storageService,
            IMediator mediator,
            ICurrentUserService currentUserService)
        {
            _storageService = storageService;
            _mediator = mediator;
            _currentUserService = currentUserService;
        }

        [HttpPatch("me/password")]
        public async Task<IActionResult> PasswordChange([FromBody] PasswordUpdateDto passwordUpdate)
        {
            var currenUser = _currentUserService.User.UserId;
            await _mediator.Send(new UpdatePasswordCommand(currenUser, passwordUpdate));
            return Ok("Password Change Successfully");
        }

        [HttpPost("me/avatar")]
        public async Task<IActionResult> UploadAvatar(IFormFile file)
        {
            int currentUser = _currentUserService.User.UserId;
            if (file == null || file.Length == 0) return BadRequest("Dosya boş.");
            var savedFileName = await _storageService.UploadFileAsync(file);
            var result = await _mediator.Send(new UpdateProfilePictureCommand(currentUser, savedFileName));
            return Ok(new { FileName = savedFileName });
        }

        [HttpGet("me/avatar/{fileName}")]
        public async Task<IActionResult> GetProfilePicture(string fileName)
        {
            try
            {
                var stream = await _storageService.GetFileStreamAsync(fileName, "user-profiles");
                return File(stream, "image/jpeg");
            }
            catch { return NotFound(); }
        }

        [HttpPatch("me/accountDeactivate")]
        public async Task<IActionResult> ChangeStatus([FromBody] AccountDeactivateDto accountDeactivate)
        {
            int currentUser = _currentUserService.User.UserId;
            int currentTenant = _currentUserService.User.TenantId;
            await _mediator.Send(new ChangeAccountStatusCommand(currentTenant, currentUser, accountDeactivate));
            return Ok("Account Deactivated Succesfully");
        }
    }
}
