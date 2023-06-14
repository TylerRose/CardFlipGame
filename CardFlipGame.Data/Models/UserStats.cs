using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CardFlipGame.Data.Models;
public class UserStats
{
    public required string Name { get; set; }
    public int AverageDurationEasy { get; set; }
    public int AverageMovesEasy { get; set; }

    public int AverageDurationMedium { get; set; }
    public int AverageMovesMedium { get; set; }

    public int AverageDurationHard { get; set; }
    public int AverageMovesHard { get; set; }
}
