using AuthModule.Application.Interfaces;
using AuthModule.Infrastructure.Persistence;
using MediatR;

namespace AuthModule.Application.Commands.ChangeProfilePictureCommand
{
    public record UpdateProfilePictureCommand(int UserId,string fileName) : IRequest<Unit>;

    public class UpdateUserProfilePictureCommandHandler : IRequestHandler<UpdateProfilePictureCommand, Unit>
    {
        private AuthDBContext _dbContext;
        private readonly IStorageService _storageService;
        public UpdateUserProfilePictureCommandHandler(AuthDBContext dbContext, IStorageService storageService)
        {
            _dbContext = dbContext;
            _storageService = storageService;
        }

        public async Task<Unit> Handle(UpdateProfilePictureCommand request, CancellationToken cancellationToken)
        {
            var user = await _dbContext.Users.FindAsync(request.UserId);
            if (user == null)
                throw new Exception("User doesn't exist");

            if (!string.IsNullOrEmpty(user.ProfilePicture))
            {
                try
                {
                    await _storageService.DeleteFileAsync(user.ProfilePicture);
                }
                catch (Exception ex)
                {
                }
            }
            user.UpdateProfilePicture(request.fileName);

            await _dbContext.SaveChangesAsync();
            return Unit.Value;
        }
    }
}
