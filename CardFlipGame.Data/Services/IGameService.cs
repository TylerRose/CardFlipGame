using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CardFlipGame.Data.Dto;

namespace CardFlipGame.Data.Services;

[Coalesce, Service]
public interface IGameService
{
    Task<UserStats> GetUserStats(string userId);
}
