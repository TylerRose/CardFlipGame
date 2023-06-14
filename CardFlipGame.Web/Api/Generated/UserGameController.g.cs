
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
    [Route("api/UserGame")]
    [Authorize]
    [ServiceFilter(typeof(IApiActionFilter))]
    public partial class UserGameController
        : BaseApiController<CardFlipGame.Data.Models.UserGame, UserGameDtoGen, CardFlipGame.Data.AppDbContext>
    {
        public UserGameController(CrudContext<CardFlipGame.Data.AppDbContext> context) : base(context)
        {
            GeneratedForClassViewModel = context.ReflectionRepository.GetClassViewModel<CardFlipGame.Data.Models.UserGame>();
        }

        [HttpGet("get/{id}")]
        [Authorize]
        public virtual Task<ItemResult<UserGameDtoGen>> Get(
            int id,
            DataSourceParameters parameters,
            IDataSource<CardFlipGame.Data.Models.UserGame> dataSource)
            => GetImplementation(id, parameters, dataSource);

        [HttpGet("list")]
        [Authorize]
        public virtual Task<ListResult<UserGameDtoGen>> List(
            ListParameters parameters,
            IDataSource<CardFlipGame.Data.Models.UserGame> dataSource)
            => ListImplementation(parameters, dataSource);

        [HttpGet("count")]
        [Authorize]
        public virtual Task<ItemResult<int>> Count(
            FilterParameters parameters,
            IDataSource<CardFlipGame.Data.Models.UserGame> dataSource)
            => CountImplementation(parameters, dataSource);

        [HttpPost("save")]
        [Authorize]
        public virtual Task<ItemResult<UserGameDtoGen>> Save(
            [FromForm] UserGameDtoGen dto,
            [FromQuery] DataSourceParameters parameters,
            IDataSource<CardFlipGame.Data.Models.UserGame> dataSource,
            IBehaviors<CardFlipGame.Data.Models.UserGame> behaviors)
            => SaveImplementation(dto, parameters, dataSource, behaviors);

        [HttpPost("delete/{id}")]
        [Authorize]
        public virtual Task<ItemResult<UserGameDtoGen>> Delete(
            int id,
            IBehaviors<CardFlipGame.Data.Models.UserGame> behaviors,
            IDataSource<CardFlipGame.Data.Models.UserGame> dataSource)
            => DeleteImplementation(id, new DataSourceParameters(), dataSource, behaviors);
    }
}
