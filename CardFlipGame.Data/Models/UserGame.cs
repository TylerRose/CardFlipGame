using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CardFlipGame.Data.Models;
public class UserGame
{
    public int UserGameId { get; set; }

    public required string UserName { get; set; }
    public int Difficulty { get; set; }
    public int DurationInSeconds { get; set; }
    public int NumberOfMoves { get; set; }

}