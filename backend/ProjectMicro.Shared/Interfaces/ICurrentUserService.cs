using ProjectMicro.Shared.Models;

namespace ProjectMicro.Shared.Interfaces;

    public interface ICurrentUserService
    {
        CurrentUser User { get; }
    }

