using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CardFlipGame.Data.Models;
public class GameService : IGameService
{
    private AppDbContext _db;
    public GameService(AppDbContext db) {
        this._db = db;
    }
    public async Task<List<UserStats>> GetUserStats(string userName)
    {
        var stats = await _db.UserGames
            .Where(entry => entry.UserName == userName)
            .GroupBy(entry => entry.UserName)
            .Select(entry => new UserStats()
            {
                Name = entry.Key,
                AverageDurationEasy = entry.Where(e => e.Difficulty == 1).Any() ? (int)entry.Where(e => e.Difficulty == 1).Average(e => e.DurationInSeconds) : -1,
                AverageMovesEasy = entry.Where(e => e.Difficulty == 1).Any() ? (int)entry.Where(e => e.Difficulty == 1).Average(e => e.NumberOfMoves) : -1,
                AverageDurationMedium = entry.Where(e => e.Difficulty == 2).Any() ? (int)entry.Where(e => e.Difficulty == 2).Average(e => e.DurationInSeconds) : -1,
                AverageMovesMedium = entry.Where(e => e.Difficulty == 2).Any() ? (int)entry.Where(e => e.Difficulty == 2).Average(e => e.NumberOfMoves) : -1,
                AverageDurationHard = entry.Where(e => e.Difficulty == 3).Any() ? (int)entry.Where(e => e.Difficulty == 3).Average(e => e.DurationInSeconds) : -1,
                AverageMovesHard = entry.Where(e => e.Difficulty == 3).Any() ? (int)entry.Where(e => e.Difficulty == 3).Average(e => e.NumberOfMoves) : -1
            })
            .ToListAsync();

        return stats;
    }

}
