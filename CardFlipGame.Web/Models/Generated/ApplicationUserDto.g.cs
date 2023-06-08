using IntelliTect.Coalesce;
using IntelliTect.Coalesce.Mapping;
using IntelliTect.Coalesce.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;

namespace CardFlipGame.Web.Models
{
    public partial class ApplicationUserDtoGen : GeneratedDto<CardFlipGame.Data.Models.ApplicationUser>
    {
        public ApplicationUserDtoGen() { }

        private int? _ApplicationUserId;
        private string _Name;

        public int? ApplicationUserId
        {
            get => _ApplicationUserId;
            set { _ApplicationUserId = value; Changed(nameof(ApplicationUserId)); }
        }
        public string Name
        {
            get => _Name;
            set { _Name = value; Changed(nameof(Name)); }
        }

        /// <summary>
        /// Map from the domain object to the properties of the current DTO instance.
        /// </summary>
        public override void MapFrom(CardFlipGame.Data.Models.ApplicationUser obj, IMappingContext context, IncludeTree tree = null)
        {
            if (obj == null) return;
            var includes = context.Includes;

            this.ApplicationUserId = obj.ApplicationUserId;
            this.Name = obj.Name;
        }

        /// <summary>
        /// Map from the current DTO instance to the domain object.
        /// </summary>
        public override void MapTo(CardFlipGame.Data.Models.ApplicationUser entity, IMappingContext context)
        {
            var includes = context.Includes;

            if (OnUpdate(entity, context)) return;

            if (ShouldMapTo(nameof(ApplicationUserId))) entity.ApplicationUserId = (ApplicationUserId ?? entity.ApplicationUserId);
            if (ShouldMapTo(nameof(Name))) entity.Name = Name;
        }

        /// <summary>
        /// Map from the current DTO instance to a new instance of the domain object.
        /// </summary>
        public override CardFlipGame.Data.Models.ApplicationUser MapToNew(IMappingContext context)
        {
            var includes = context.Includes;

            var entity = new CardFlipGame.Data.Models.ApplicationUser()
            {
                Name = Name,
            };

            if (OnUpdate(entity, context)) return entity;
            if (ShouldMapTo(nameof(ApplicationUserId))) entity.ApplicationUserId = (ApplicationUserId ?? entity.ApplicationUserId);

            return entity;
        }
    }
}
