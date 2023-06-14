using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CardFlipGame.Data.Models;

[Coalesce, Service]
public interface IGameService
{
    Task<List<UserStats>> GetUserStats(string userName);
}
