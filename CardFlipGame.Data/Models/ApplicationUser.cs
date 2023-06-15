using Microsoft.AspNetCore.Identity;

namespace CardFlipGame.Data.Models;
public class ApplicationUser : IdentityUser
{

    public required string Name { get; set; }
}
