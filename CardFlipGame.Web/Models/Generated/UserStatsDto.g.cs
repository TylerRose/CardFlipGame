using IntelliTect.Coalesce;
using IntelliTect.Coalesce.Mapping;
using IntelliTect.Coalesce.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;

namespace CardFlipGame.Web.Models
{
    public partial class UserStatsDtoGen : GeneratedDto<CardFlipGame.Data.Dto.UserStats>
    {
        public UserStatsDtoGen() { }

        private string _UserId;
        private CardFlipGame.Web.Models.ApplicationUserDtoGen _User;
        private int? _AverageDurationEasy;
        private int? _AverageMovesEasy;
        private int? _AverageDurationMedium;
        private int? _AverageMovesMedium;
        private int? _AverageDurationHard;
        private int? _AverageMovesHard;

        public string UserId
        {
            get => _UserId;
            set { _UserId = value; Changed(nameof(UserId)); }
        }
        public CardFlipGame.Web.Models.ApplicationUserDtoGen User
        {
            get => _User;
            set { _User = value; Changed(nameof(User)); }
        }
        public int? AverageDurationEasy
        {
            get => _AverageDurationEasy;
            set { _AverageDurationEasy = value; Changed(nameof(AverageDurationEasy)); }
        }
        public int? AverageMovesEasy
        {
            get => _AverageMovesEasy;
            set { _AverageMovesEasy = value; Changed(nameof(AverageMovesEasy)); }
        }
        public int? AverageDurationMedium
        {
            get => _AverageDurationMedium;
            set { _AverageDurationMedium = value; Changed(nameof(AverageDurationMedium)); }
        }
        public int? AverageMovesMedium
        {
            get => _AverageMovesMedium;
            set { _AverageMovesMedium = value; Changed(nameof(AverageMovesMedium)); }
        }
        public int? AverageDurationHard
        {
            get => _AverageDurationHard;
            set { _AverageDurationHard = value; Changed(nameof(AverageDurationHard)); }
        }
        public int? AverageMovesHard
        {
            get => _AverageMovesHard;
            set { _AverageMovesHard = value; Changed(nameof(AverageMovesHard)); }
        }

        /// <summary>
        /// Map from the domain object to the properties of the current DTO instance.
        /// </summary>
        public override void MapFrom(CardFlipGame.Data.Dto.UserStats obj, IMappingContext context, IncludeTree tree = null)
        {
            if (obj == null) return;
            var includes = context.Includes;

            this.UserId = obj.UserId;
            this.AverageDurationEasy = obj.AverageDurationEasy;
            this.AverageMovesEasy = obj.AverageMovesEasy;
            this.AverageDurationMedium = obj.AverageDurationMedium;
            this.AverageMovesMedium = obj.AverageMovesMedium;
            this.AverageDurationHard = obj.AverageDurationHard;
            this.AverageMovesHard = obj.AverageMovesHard;
            if (tree == null || tree[nameof(this.User)] != null)
                this.User = obj.User.MapToDto<CardFlipGame.Data.Models.ApplicationUser, ApplicationUserDtoGen>(context, tree?[nameof(this.User)]);

        }

        /// <summary>
        /// Map from the current DTO instance to the domain object.
        /// </summary>
        public override void MapTo(CardFlipGame.Data.Dto.UserStats entity, IMappingContext context)
        {
            var includes = context.Includes;

            if (OnUpdate(entity, context)) return;

            if (ShouldMapTo(nameof(UserId))) entity.UserId = UserId;
            if (ShouldMapTo(nameof(AverageDurationEasy))) entity.AverageDurationEasy = (AverageDurationEasy ?? entity.AverageDurationEasy);
            if (ShouldMapTo(nameof(AverageMovesEasy))) entity.AverageMovesEasy = (AverageMovesEasy ?? entity.AverageMovesEasy);
            if (ShouldMapTo(nameof(AverageDurationMedium))) entity.AverageDurationMedium = (AverageDurationMedium ?? entity.AverageDurationMedium);
            if (ShouldMapTo(nameof(AverageMovesMedium))) entity.AverageMovesMedium = (AverageMovesMedium ?? entity.AverageMovesMedium);
            if (ShouldMapTo(nameof(AverageDurationHard))) entity.AverageDurationHard = (AverageDurationHard ?? entity.AverageDurationHard);
            if (ShouldMapTo(nameof(AverageMovesHard))) entity.AverageMovesHard = (AverageMovesHard ?? entity.AverageMovesHard);
        }

        /// <summary>
        /// Map from the current DTO instance to a new instance of the domain object.
        /// </summary>
        public override CardFlipGame.Data.Dto.UserStats MapToNew(IMappingContext context)
        {
            var entity = new CardFlipGame.Data.Dto.UserStats();
            MapTo(entity, context);
            return entity;
        }
    }
}
