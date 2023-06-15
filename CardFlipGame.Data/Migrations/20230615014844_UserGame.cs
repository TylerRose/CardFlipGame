using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CardFlipGame.Data.Migrations
{
    /// <inheritdoc />
    public partial class UserGame : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ApplicationUserId",
                table: "AspNetUsers");

            migrationBuilder.CreateTable(
                name: "UserGames",
                columns: table => new
                {
                    UserGameId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Difficulty = table.Column<int>(type: "int", nullable: false),
                    DurationInSeconds = table.Column<int>(type: "int", nullable: false),
                    NumberOfMoves = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserGames", x => x.UserGameId);
                    table.ForeignKey(
                        name: "FK_UserGames_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserGames_UserId",
                table: "UserGames",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserGames");

            migrationBuilder.AddColumn<int>(
                name: "ApplicationUserId",
                table: "AspNetUsers",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
