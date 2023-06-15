using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CardFlipGame.Data.Hubs;
public class RaceGameHub : Hub
{
    public async Task SetGameBoard(int gameId, List<int> idOrder, List<string> icons)
    {
        await Clients.All.SendAsync($"raceGame-Init-{gameId}", idOrder);
    }
    public async Task UpdateGameState(int gameId, int points, List<int> playerQueue, List<int> matched)
    {
        await Clients.All.SendAsync($"raceGame-State-{gameId}", points, playerQueue, matched);
    }

    public async Task ReadyGame(int gameId, int playerNumber)
    {
        await Clients.All.SendAsync($"raceGame-Ready-{gameId}", playerNumber);
    }
}