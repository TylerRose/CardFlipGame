using Microsoft.AspNetCore.Identity;

namespace CardFlipGame.Data.Models;
public class ApplicationUser : IdentityUser
{
    public int ApplicationUserId { get; set; }

    public required string Name { get; set; }
}
