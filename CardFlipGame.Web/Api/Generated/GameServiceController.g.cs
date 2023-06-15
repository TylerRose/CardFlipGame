
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
    [Route("api/GameService")]
    [ServiceFilter(typeof(IApiActionFilter))]
    public partial class GameServiceController : Controller
    {
        protected ClassViewModel GeneratedForClassViewModel { get; }
        protected CardFlipGame.Data.Services.IGameService Service { get; }
        protected CrudContext Context { get; }

        public GameServiceController(CrudContext context, CardFlipGame.Data.Services.IGameService service)
        {
            GeneratedForClassViewModel = context.ReflectionRepository.GetClassViewModel<CardFlipGame.Data.Services.IGameService>();
            Service = service;
            Context = context;
        }

        /// <summary>
        /// Method: GetUserStats
        /// </summary>
        [HttpPost("GetUserStats")]
        [Authorize]
        public virtual async Task<ItemResult<UserStatsDtoGen>> GetUserStats(
            [FromForm(Name = "userId")] string userId)
        {
            var _params = new
            {
                userId = userId
            };

            if (Context.Options.ValidateAttributesForMethods)
            {
                var _validationResult = ItemResult.FromParameterValidation(
                    GeneratedForClassViewModel!.MethodByName("GetUserStats"), _params, HttpContext.RequestServices);
                if (!_validationResult.WasSuccessful) return new ItemResult<UserStatsDtoGen>(_validationResult);
            }

            IncludeTree includeTree = null;
            var _mappingContext = new MappingContext(User);
            var _methodResult = await Service.GetUserStats(
                _params.userId
            );
            var _result = new ItemResult<UserStatsDtoGen>();
            _result.Object = Mapper.MapToDto<CardFlipGame.Data.Dto.UserStats, UserStatsDtoGen>(_methodResult, _mappingContext, includeTree);
            return _result;
        }
    }
}
