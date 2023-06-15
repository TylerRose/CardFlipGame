
using CardFlipGame.Web.Models;
using IntelliTect.Coalesce;
using IntelliTect.Coalesce.Api;
using IntelliTect.Coalesce.Api.Controllers;
using IntelliTect.Coalesce.Api.DataSources;
using IntelliTect.Coalesce.Mapping;
using IntelliTect.Coalesce.Mapping.IncludeTrees;
using IntelliTect.Coalesce.Models;
using IntelliTect.Coalesce.TypeDefinition;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace CardFlipGame.Web.Api
{
    [Route("api/RaceGame")]
    [Authorize]
    [ServiceFilter(typeof(IApiActionFilter))]
    public partial class RaceGameController
        : BaseApiController<CardFlipGame.Data.Models.RaceGame, RaceGameDtoGen, CardFlipGame.Data.AppDbContext>
    {
        public RaceGameController(CrudContext<CardFlipGame.Data.AppDbContext> context) : base(context)
        {
            GeneratedForClassViewModel = context.ReflectionRepository.GetClassViewModel<CardFlipGame.Data.Models.RaceGame>();
        }

        [HttpGet("get/{id}")]
        [Authorize]
        public virtual Task<ItemResult<RaceGameDtoGen>> Get(
            int id,
            DataSourceParameters parameters,
            IDataSource<CardFlipGame.Data.Models.RaceGame> dataSource)
            => GetImplementation(id, parameters, dataSource);

        [HttpGet("list")]
        [Authorize]
        public virtual Task<ListResult<RaceGameDtoGen>> List(
            ListParameters parameters,
            IDataSource<CardFlipGame.Data.Models.RaceGame> dataSource)
            => ListImplementation(parameters, dataSource);

        [HttpGet("count")]
        [Authorize]
        public virtual Task<ItemResult<int>> Count(
            FilterParameters parameters,
            IDataSource<CardFlipGame.Data.Models.RaceGame> dataSource)
            => CountImplementation(parameters, dataSource);

        [HttpPost("save")]
        [Authorize]
        public virtual Task<ItemResult<RaceGameDtoGen>> Save(
            [FromForm] RaceGameDtoGen dto,
            [FromQuery] DataSourceParameters parameters,
            IDataSource<CardFlipGame.Data.Models.RaceGame> dataSource,
            IBehaviors<CardFlipGame.Data.Models.RaceGame> behaviors)
            => SaveImplementation(dto, parameters, dataSource, behaviors);

        [HttpPost("delete/{id}")]
        [Authorize]
        public virtual Task<ItemResult<RaceGameDtoGen>> Delete(
            int id,
            IBehaviors<CardFlipGame.Data.Models.RaceGame> behaviors,
            IDataSource<CardFlipGame.Data.Models.RaceGame> dataSource)
            => DeleteImplementation(id, new DataSourceParameters(), dataSource, behaviors);
    }
}
