using IntelliTect.Coalesce;
using IntelliTect.Coalesce.Mapping;
using IntelliTect.Coalesce.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;

namespace CardFlipGame.Web.Models
{
    public partial class RaceGameDtoGen : GeneratedDto<CardFlipGame.Data.Models.RaceGame>
    {
        public RaceGameDtoGen() { }

        private int? _RaceGameId;
        private string _PlayerOneId;
        private CardFlipGame.Web.Models.ApplicationUserDtoGen _PlayerOne;
        private string _PlayerTwoId;
        private CardFlipGame.Web.Models.ApplicationUserDtoGen _PlayerTwo;
        private int? _Player1Score;
        private int? _Player2Score;
        private int? _QueueBonus;
        private bool? _IsComplete;
        private bool? _CanJoin;

        public int? RaceGameId
        {
            get => _RaceGameId;
            set { _RaceGameId = value; Changed(nameof(RaceGameId)); }
        }
        public string PlayerOneId
        {
            get => _PlayerOneId;
            set { _PlayerOneId = value; Changed(nameof(PlayerOneId)); }
        }
        public CardFlipGame.Web.Models.ApplicationUserDtoGen PlayerOne
        {
            get => _PlayerOne;
            set { _PlayerOne = value; Changed(nameof(PlayerOne)); }
        }
        public string PlayerTwoId
        {
            get => _PlayerTwoId;
            set { _PlayerTwoId = value; Changed(nameof(PlayerTwoId)); }
        }
        public CardFlipGame.Web.Models.ApplicationUserDtoGen PlayerTwo
        {
            get => _PlayerTwo;
            set { _PlayerTwo = value; Changed(nameof(PlayerTwo)); }
        }
        public int? Player1Score
        {
            get => _Player1Score;
            set { _Player1Score = value; Changed(nameof(Player1Score)); }
        }
        public int? Player2Score
        {
            get => _Player2Score;
            set { _Player2Score = value; Changed(nameof(Player2Score)); }
        }
        public int? QueueBonus
        {
            get => _QueueBonus;
            set { _QueueBonus = value; Changed(nameof(QueueBonus)); }
        }
        public bool? IsComplete
        {
            get => _IsComplete;
            set { _IsComplete = value; Changed(nameof(IsComplete)); }
        }
        public bool? CanJoin
        {
            get => _CanJoin;
            set { _CanJoin = value; Changed(nameof(CanJoin)); }
        }

        /// <summary>
        /// Map from the domain object to the properties of the current DTO instance.
        /// </summary>
        public override void MapFrom(CardFlipGame.Data.Models.RaceGame obj, IMappingContext context, IncludeTree tree = null)
        {
            if (obj == null) return;
            var includes = context.Includes;

            this.RaceGameId = obj.RaceGameId;
            this.PlayerOneId = obj.PlayerOneId;
            this.PlayerTwoId = obj.PlayerTwoId;
            this.Player1Score = obj.Player1Score;
            this.Player2Score = obj.Player2Score;
            this.QueueBonus = obj.QueueBonus;
            this.IsComplete = obj.IsComplete;
            this.CanJoin = obj.CanJoin;
            if (tree == null || tree[nameof(this.PlayerOne)] != null)
                this.PlayerOne = obj.PlayerOne.MapToDto<CardFlipGame.Data.Models.ApplicationUser, ApplicationUserDtoGen>(context, tree?[nameof(this.PlayerOne)]);

            if (tree == null || tree[nameof(this.PlayerTwo)] != null)
                this.PlayerTwo = obj.PlayerTwo.MapToDto<CardFlipGame.Data.Models.ApplicationUser, ApplicationUserDtoGen>(context, tree?[nameof(this.PlayerTwo)]);

        }

        /// <summary>
        /// Map from the current DTO instance to the domain object.
        /// </summary>
        public override void MapTo(CardFlipGame.Data.Models.RaceGame entity, IMappingContext context)
        {
            var includes = context.Includes;

            if (OnUpdate(entity, context)) return;

            if (ShouldMapTo(nameof(RaceGameId))) entity.RaceGameId = (RaceGameId ?? entity.RaceGameId);
            if (ShouldMapTo(nameof(PlayerOneId))) entity.PlayerOneId = PlayerOneId;
            if (ShouldMapTo(nameof(PlayerTwoId))) entity.PlayerTwoId = PlayerTwoId;
            if (ShouldMapTo(nameof(Player1Score))) entity.Player1Score = Player1Score;
            if (ShouldMapTo(nameof(Player2Score))) entity.Player2Score = Player2Score;
            if (ShouldMapTo(nameof(QueueBonus))) entity.QueueBonus = (QueueBonus ?? entity.QueueBonus);
            if (ShouldMapTo(nameof(IsComplete))) entity.IsComplete = (IsComplete ?? entity.IsComplete);
        }

        /// <summary>
        /// Map from the current DTO instance to a new instance of the domain object.
        /// </summary>
        public override CardFlipGame.Data.Models.RaceGame MapToNew(IMappingContext context)
        {
            var entity = new CardFlipGame.Data.Models.RaceGame();
            MapTo(entity, context);
            return entity;
        }
    }
}
