using AuthModule.Data;
using AuthModule.Interfaces;
using MediatR;

namespace AuthModule.Services
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
            user.ProfilePicture = request.fileName;

            await _dbContext.SaveChangesAsync();
            return Unit.Value;
        }
    }
}
