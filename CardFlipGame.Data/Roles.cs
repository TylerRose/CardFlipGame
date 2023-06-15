namespace CardFlipGame.Data;
public static class Roles
{
    public const string Admin = nameof(Admin);
    public const string User = nameof(User);
    public static string[] AllRoles => typeof(Roles).GetFields().Select(role => role.Name).ToArray();
}