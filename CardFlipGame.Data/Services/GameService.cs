using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CardFlipGame.Data.Dto;

namespace CardFlipGame.Data.Services;
public class GameService : IGameService
{
    private AppDbContext _db;
    public GameService(AppDbContext db)
    {
        _db = db;
    }
    public async Task<UserStats> GetUserStats(string userId)
    {
        var stats = await _db.UserGames
            .Where(entry => entry.UserId == userId)
            .ToListAsync();

        var userStatsDto = new UserStats()
        {
            UserId = stats.First().UserId,
            User = stats.First().User,
            AverageDurationEasy = (int)stats.Where(e => e.Difficulty == 1).Average(e => e.DurationInSeconds),
            AverageMovesEasy = (int)stats.Where(e => e.Difficulty == 1).Average(e => e.NumberOfMoves),
            AverageDurationMedium = (int)stats.Where(e => e.Difficulty == 2).Average(e => e.DurationInSeconds),
            AverageMovesMedium = (int)stats.Where(e => e.Difficulty == 2).Average(e => e.NumberOfMoves),

            AverageDurationHard = (int)stats.Where(e => e.Difficulty == 3).Average(e => e.DurationInSeconds),
            AverageMovesHard = (int)stats.Where(e => e.Difficulty == 3).Average(e => e.NumberOfMoves),
        };
        return userStatsDto;
    }

}
