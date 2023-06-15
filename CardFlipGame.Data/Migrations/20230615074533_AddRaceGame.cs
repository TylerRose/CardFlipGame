using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CardFlipGame.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddRaceGame : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "RaceGames",
                columns: table => new
                {
                    RaceGameId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PlayerOneId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    PlayerTwoId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Player1Score = table.Column<int>(type: "int", nullable: true),
                    Player2Score = table.Column<int>(type: "int", nullable: true),
                    QueueBonus = table.Column<int>(type: "int", nullable: false),
                    IsComplete = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RaceGames", x => x.RaceGameId);
                    table.ForeignKey(
                        name: "FK_RaceGames_AspNetUsers_PlayerOneId",
                        column: x => x.PlayerOneId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RaceGames_AspNetUsers_PlayerTwoId",
                        column: x => x.PlayerTwoId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RaceGames_PlayerOneId",
                table: "RaceGames",
                column: "PlayerOneId");

            migrationBuilder.CreateIndex(
                name: "IX_RaceGames_PlayerTwoId",
                table: "RaceGames",
                column: "PlayerTwoId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RaceGames");
        }
    }
}
