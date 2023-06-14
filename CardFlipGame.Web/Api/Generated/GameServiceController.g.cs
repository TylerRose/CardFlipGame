
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
        protected CardFlipGame.Data.Models.IGameService Service { get; }
        protected CrudContext Context { get; }

        public GameServiceController(CrudContext context, CardFlipGame.Data.Models.IGameService service)
        {
            GeneratedForClassViewModel = context.ReflectionRepository.GetClassViewModel<CardFlipGame.Data.Models.IGameService>();
            Service = service;
            Context = context;
        }

        /// <summary>
        /// Method: GetUserStats
        /// </summary>
        [HttpPost("GetUserStats")]
        [Authorize]
        public virtual async Task<ItemResult<System.Collections.Generic.ICollection<UserStatsDtoGen>>> GetUserStats(
            [FromForm(Name = "userName")] string userName)
        {
            var _params = new
            {
                userName = userName
            };

            if (Context.Options.ValidateAttributesForMethods)
            {
                var _validationResult = ItemResult.FromParameterValidation(
                    GeneratedForClassViewModel!.MethodByName("GetUserStats"), _params, HttpContext.RequestServices);
                if (!_validationResult.WasSuccessful) return new ItemResult<System.Collections.Generic.ICollection<UserStatsDtoGen>>(_validationResult);
            }

            IncludeTree includeTree = null;
            var _mappingContext = new MappingContext(User);
            var _methodResult = await Service.GetUserStats(
                _params.userName
            );
            var _result = new ItemResult<System.Collections.Generic.ICollection<UserStatsDtoGen>>();
            _result.Object = _methodResult?.ToList().Select(o => Mapper.MapToDto<CardFlipGame.Data.Models.UserStats, UserStatsDtoGen>(o, _mappingContext, includeTree)).ToList();
            return _result;
        }
    }
}
