using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using CardFlipGame.Data.Models;
using IntelliTect.Coalesce.Models;
using static System.Net.WebRequestMethods;
using Microsoft.AspNetCore.Components.Forms;

namespace CardFlipGame.Data.Services;

public class LoginService : ILoginService
{
    private AppDbContext Db { get; set; }
    private SignInManager<ApplicationUser> SignInManager { get; }
    private UserManager<ApplicationUser> UserManager { get; }

    public LoginService(AppDbContext db, SignInManager<ApplicationUser> signInManager, UserManager<ApplicationUser> userManager)
    {
        Db = db;
        SignInManager = signInManager;
        UserManager = userManager;
    }
    public async Task<ItemResult> Login(string email, string password)
    {
        SignInResult? result = await SignInManager.PasswordSignInAsync(email, password, false, false);

        if (result.Succeeded)
        {
            return true;
        }
        else
        {
            return "Unable to log in, please check your credentials.";
        }
    }

    public async Task<ItemResult> Logout()
    {
        await SignInManager.SignOutAsync();
        return true;
    }

    public async Task<ItemResult> CreateAccount(string name, string email, string password)
    {
        if (Db.Users.Any(u => u.Email == email))
        {
            return "The provided email address is already in use.";
        }
        else
        {
            ApplicationUser newUser = new() { Name = name, Email = email, UserName = email };
            IdentityResult? createUserResult = await UserManager.CreateAsync(newUser, password);
            if (createUserResult.Succeeded)
            {
                await UserManager.AddToRoleAsync(newUser, Roles.User);
                await Db.SaveChangesAsync();
                return true;
            }
            var errorsList = "";
            createUserResult.Errors.ToList().ForEach(error =>
            {
                errorsList += error.Code + " - " + error.Description + ",\n";
            });
            return $"Unable to create the account: {errorsList}";
        }
    }

    public async Task<ItemResult> ChangePassword(ClaimsPrincipal user, string currentPassword, string newPassword)
    {
        Claim? claim = user.FindFirst(ClaimTypes.NameIdentifier);
        if (claim != null)
        {

            ApplicationUser? existingUser = Db.Users.FirstOrDefault(u => u.Id == claim.Value);
            if (existingUser == null)
            {
                return "Unable to find the account.";
            }

            IdentityResult result = await UserManager.ChangePasswordAsync(existingUser, currentPassword, newPassword);
            if (!result.Succeeded)
            {
                return "Unable to update the password.";
            }

            return true;
        }
        else
        {
            return "Unauthorized to change password";
        }
    }

    public ItemResult IsLoggedIn(ClaimsPrincipal user)
    {
        if (user.Identity?.IsAuthenticated ?? false)
        {
            return true;
        }
        else
        {
            return "You are not signed in";
        }
    }

    public ItemResult<ApplicationUser> GetUserInfo(ClaimsPrincipal user)
    {
        if (user.Identity?.IsAuthenticated ?? false)
        {
            var callingUserId = user.Claims.First(c => c.Type == ClaimTypes.NameIdentifier);
            return Db.ApplicationUsers.Single(u => u.Id == callingUserId.Value);
        }
        else
        {
            return "You are not signed in";
        }
    }
}