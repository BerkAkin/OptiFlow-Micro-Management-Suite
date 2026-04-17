
namespace AuthModule.Interfaces
{
    public interface IStorageService
    {
        Task<string> UploadFileAsync(IFormFile file);
        Task DeleteFileAsync(string fileName);
        Task<Stream> GetFileStreamAsync(string fileName, string bucketName);
    }
}
