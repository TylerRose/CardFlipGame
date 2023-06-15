using CardFlipGame.Data.Models;
using Humanizer.Localisation.TimeToClockNotation;
using Microsoft.AspNetCore.SignalR;

namespace CardFlipGame.Data.Hubs;
public class LobbbyHub : Hub
{
    private AppDbContext _db;
    public LobbbyHub(AppDbContext db)
    {
        _db = db;
    }

    public async Task Ping()
    {
        await Clients.All.SendAsync("Pong", true);
    }

    public async Task GetAvailableGames()
    {
        await Clients.All.SendAsync("gameLobbies", JoinableGames().ToList());
    }

    public async Task CreateGame()
    {
        await Clients.All.SendAsync("gameLobbies", JoinableGames().ToList());
    }
    public async Task GetMyGame(string userId)
    {
        var game = _db.RaceGames.FirstOrDefault(x => x.PlayerOneId == userId || x.PlayerTwoId == userId);
        await Clients.All.SendAsync($"myGame-{userId}", game);
    }

    public async Task JoinGame(int gameId, string userId) {
        var join = _db.RaceGames.FirstOrDefault(x => x.RaceGameId == gameId);
        if (join is not null && join.CanJoin) {
            join.PlayerTwoId = userId;
            _db.SaveChanges();
        }
        await Clients.All.SendAsync($"gameLobbies-P2Joined-{gameId}", join);
    }

    public async Task RemoveGame(int gameId)
    {
        var remove = _db.RaceGames.FirstOrDefault(x => x.RaceGameId == gameId);
        if (remove is not null)
        {
            _db.RaceGames.Remove(remove);
            _db.SaveChanges();
            await Clients.All.SendAsync("gameLobbies", JoinableGames().ToList());
        }
    }

    public async Task LeaveGame(string userId) {
        var gameToLeave = JoinableGames().Where(g => g.PlayerOneId == userId || g.PlayerTwoId == userId).FirstOrDefault();
        if(gameToLeave is not null)
        {
            if(gameToLeave.PlayerOneId == userId)
            {
                _db.RaceGames.Remove(gameToLeave);
                await Clients.All.SendAsync($"gameLobbies-Deleted-{gameToLeave.RaceGameId}");
            }
            else
            {
                gameToLeave.PlayerTwoId = null;
                await Clients.All.SendAsync($"gameLobbies-P2Joined-{gameToLeave.RaceGameId}", false);
            }
            _db.SaveChanges();
        }
    }

    private IQueryable<RaceGame> JoinableGames()
    {
        return _db.RaceGames.Where(g => g.PlayerTwoId == null && !g.IsComplete);
    }

}