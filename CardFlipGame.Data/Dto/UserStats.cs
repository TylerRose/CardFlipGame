using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CardFlipGame.Data.Models;

namespace CardFlipGame.Data.Dto;
public class UserStats
{
    public string UserId { get; set; } = null!;
    public ApplicationUser User { get; set; } = null!;
    public int AverageDurationEasy { get; set; }
    public int AverageMovesEasy { get; set; }

    public int AverageDurationMedium { get; set; }
    public int AverageMovesMedium { get; set; }

    public int AverageDurationHard { get; set; }
    public int AverageMovesHard { get; set; }
}
