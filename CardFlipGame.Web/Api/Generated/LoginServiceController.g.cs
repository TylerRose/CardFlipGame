
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
    [Route("api/LoginService")]
    [ServiceFilter(typeof(IApiActionFilter))]
    public partial class LoginServiceController : Controller
    {
        protected ClassViewModel GeneratedForClassViewModel { get; }
        protected CardFlipGame.Data.Services.ILoginService Service { get; }
        protected CrudContext Context { get; }

        public LoginServiceController(CrudContext context, CardFlipGame.Data.Services.ILoginService service)
        {
            GeneratedForClassViewModel = context.ReflectionRepository.GetClassViewModel<CardFlipGame.Data.Services.ILoginService>();
            Service = service;
            Context = context;
        }

        /// <summary>
        /// Method: Login
        /// </summary>
        [HttpPost("Login")]
        [AllowAnonymous]
        public virtual async Task<ItemResult> Login(
            [FromForm(Name = "email")] string email,
            [FromForm(Name = "password")] string password)
        {
            var _params = new
            {
                email = email,
                password = password
            };

            if (Context.Options.ValidateAttributesForMethods)
            {
                var _validationResult = ItemResult.FromParameterValidation(
                    GeneratedForClassViewModel!.MethodByName("Login"), _params, HttpContext.RequestServices);
                if (!_validationResult.WasSuccessful) return _validationResult;
            }

            var _methodResult = await Service.Login(
                _params.email,
                _params.password
            );
            var _result = new ItemResult(_methodResult);
            return _result;
        }

        /// <summary>
        /// Method: Logout
        /// </summary>
        [HttpPost("Logout")]
        [AllowAnonymous]
        public virtual async Task<ItemResult> Logout()
        {
            var _methodResult = await Service.Logout();
            var _result = new ItemResult(_methodResult);
            return _result;
        }

        /// <summary>
        /// Method: CreateAccount
        /// </summary>
        [HttpPost("CreateAccount")]
        [AllowAnonymous]
        public virtual async Task<ItemResult> CreateAccount(
            [FromForm(Name = "name")] string name,
            [FromForm(Name = "email")] string email,
            [FromForm(Name = "password")] string password)
        {
            var _params = new
            {
                name = name,
                email = email,
                password = password
            };

            if (Context.Options.ValidateAttributesForMethods)
            {
                var _validationResult = ItemResult.FromParameterValidation(
                    GeneratedForClassViewModel!.MethodByName("CreateAccount"), _params, HttpContext.RequestServices);
                if (!_validationResult.WasSuccessful) return _validationResult;
            }

            var _methodResult = await Service.CreateAccount(
                _params.name,
                _params.email,
                _params.password
            );
            var _result = new ItemResult(_methodResult);
            return _result;
        }

        /// <summary>
        /// Method: ChangePassword
        /// </summary>
        [HttpPost("ChangePassword")]
        [Authorize]
        public virtual async Task<ItemResult> ChangePassword(
            [FromForm(Name = "currentPassword")] string currentPassword,
            [FromForm(Name = "newPassword")] string newPassword)
        {
            var _params = new
            {
                currentPassword = currentPassword,
                newPassword = newPassword
            };

            if (Context.Options.ValidateAttributesForMethods)
            {
                var _validationResult = ItemResult.FromParameterValidation(
                    GeneratedForClassViewModel!.MethodByName("ChangePassword"), _params, HttpContext.RequestServices);
                if (!_validationResult.WasSuccessful) return _validationResult;
            }

            var _methodResult = await Service.ChangePassword(
                User,
                _params.currentPassword,
                _params.newPassword
            );
            var _result = new ItemResult(_methodResult);
            return _result;
        }

        /// <summary>
        /// Method: IsLoggedIn
        /// </summary>
        [HttpPost("IsLoggedIn")]
        [AllowAnonymous]
        public virtual ItemResult IsLoggedIn()
        {
            var _methodResult = Service.IsLoggedIn(
                User
            );
            var _result = new ItemResult(_methodResult);
            return _result;
        }
    }
}
