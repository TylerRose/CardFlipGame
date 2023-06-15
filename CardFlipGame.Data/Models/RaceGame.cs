using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CardFlipGame.Data.Models;
public class RaceGame
{
    public int RaceGameId { get; set; }

    public string PlayerOneId { get; set; } = null!;
    public ApplicationUser PlayerOne { get; set; } = null!;

    public string? PlayerTwoId { get; set; } 
    public ApplicationUser? PlayerTwo { get; set; }

    public int? Player1Score { get; set; }
    public int? Player2Score { get;set; }

    public int QueueBonus { get; set; }

    public bool IsComplete { get; set; }

    [NotMapped]
    public bool CanJoin => PlayerOneId == null || PlayerTwoId == null;
}
