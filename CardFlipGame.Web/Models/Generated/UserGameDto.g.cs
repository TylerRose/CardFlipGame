using IntelliTect.Coalesce;
using IntelliTect.Coalesce.Mapping;
using IntelliTect.Coalesce.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;

namespace CardFlipGame.Web.Models
{
    public partial class UserGameDtoGen : GeneratedDto<CardFlipGame.Data.Models.UserGame>
    {
        public UserGameDtoGen() { }

        private int? _UserGameId;
        private string _UserName;
        private int? _Difficulty;
        private int? _DurationInSeconds;
        private int? _NumberOfMoves;

        public int? UserGameId
        {
            get => _UserGameId;
            set { _UserGameId = value; Changed(nameof(UserGameId)); }
        }
        public string UserName
        {
            get => _UserName;
            set { _UserName = value; Changed(nameof(UserName)); }
        }
        public int? Difficulty
        {
            get => _Difficulty;
            set { _Difficulty = value; Changed(nameof(Difficulty)); }
        }
        public int? DurationInSeconds
        {
            get => _DurationInSeconds;
            set { _DurationInSeconds = value; Changed(nameof(DurationInSeconds)); }
        }
        public int? NumberOfMoves
        {
            get => _NumberOfMoves;
            set { _NumberOfMoves = value; Changed(nameof(NumberOfMoves)); }
        }

        /// <summary>
        /// Map from the domain object to the properties of the current DTO instance.
        /// </summary>
        public override void MapFrom(CardFlipGame.Data.Models.UserGame obj, IMappingContext context, IncludeTree tree = null)
        {
            if (obj == null) return;
            var includes = context.Includes;

            this.UserGameId = obj.UserGameId;
            this.UserName = obj.UserName;
            this.Difficulty = obj.Difficulty;
            this.DurationInSeconds = obj.DurationInSeconds;
            this.NumberOfMoves = obj.NumberOfMoves;
        }

        /// <summary>
        /// Map from the current DTO instance to the domain object.
        /// </summary>
        public override void MapTo(CardFlipGame.Data.Models.UserGame entity, IMappingContext context)
        {
            var includes = context.Includes;

            if (OnUpdate(entity, context)) return;

            if (ShouldMapTo(nameof(UserGameId))) entity.UserGameId = (UserGameId ?? entity.UserGameId);
            if (ShouldMapTo(nameof(UserName))) entity.UserName = UserName;
            if (ShouldMapTo(nameof(Difficulty))) entity.Difficulty = (Difficulty ?? entity.Difficulty);
            if (ShouldMapTo(nameof(DurationInSeconds))) entity.DurationInSeconds = (DurationInSeconds ?? entity.DurationInSeconds);
            if (ShouldMapTo(nameof(NumberOfMoves))) entity.NumberOfMoves = (NumberOfMoves ?? entity.NumberOfMoves);
        }

        /// <summary>
        /// Map from the current DTO instance to a new instance of the domain object.
        /// </summary>
        public override CardFlipGame.Data.Models.UserGame MapToNew(IMappingContext context)
        {
            var includes = context.Includes;

            var entity = new CardFlipGame.Data.Models.UserGame()
            {
                UserName = UserName,
            };

            if (OnUpdate(entity, context)) return entity;
            if (ShouldMapTo(nameof(UserGameId))) entity.UserGameId = (UserGameId ?? entity.UserGameId);
            if (ShouldMapTo(nameof(Difficulty))) entity.Difficulty = (Difficulty ?? entity.Difficulty);
            if (ShouldMapTo(nameof(DurationInSeconds))) entity.DurationInSeconds = (DurationInSeconds ?? entity.DurationInSeconds);
            if (ShouldMapTo(nameof(NumberOfMoves))) entity.NumberOfMoves = (NumberOfMoves ?? entity.NumberOfMoves);

            return entity;
        }
    }
}
