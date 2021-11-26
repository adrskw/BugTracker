using BugTracker.Domain;

namespace BugTracker.API.Services
{
    public interface ITokenService
    {
        string CreateToken(ApplicationUser user);
    }
}