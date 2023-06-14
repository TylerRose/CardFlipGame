import {
  Domain, getEnumMeta, solidify, ModelType, ObjectType,
  PrimitiveProperty, ForeignKeyProperty, PrimaryKeyProperty,
  ModelCollectionNavigationProperty, ModelReferenceNavigationProperty,
  HiddenAreas, BehaviorFlags
} from 'coalesce-vue/lib/metadata'


const domain: Domain = { enums: {}, types: {}, services: {} }
export const ApplicationUser = domain.types.ApplicationUser = {
  name: "ApplicationUser",
  displayName: "Application User",
  get displayProp() { return this.props.name }, 
  type: "model",
  controllerRoute: "ApplicationUser",
  get keyProp() { return this.props.applicationUserId }, 
  behaviorFlags: 7 as BehaviorFlags,
  props: {
    applicationUserId: {
      name: "applicationUserId",
      displayName: "Application User Id",
      type: "number",
      role: "primaryKey",
      hidden: 3 as HiddenAreas,
    },
    name: {
      name: "name",
      displayName: "Name",
      type: "string",
      role: "value",
      rules: {
        required: val => (val != null && val !== '') || "Name is required.",
      }
    },
  },
  methods: {
  },
  dataSources: {
  },
}
export const UserGame = domain.types.UserGame = {
  name: "UserGame",
  displayName: "User Game",
  get displayProp() { return this.props.userGameId }, 
  type: "model",
  controllerRoute: "UserGame",
  get keyProp() { return this.props.userGameId }, 
  behaviorFlags: 7 as BehaviorFlags,
  props: {
    userGameId: {
      name: "userGameId",
      displayName: "User Game Id",
      type: "number",
      role: "primaryKey",
      hidden: 3 as HiddenAreas,
    },
    userName: {
      name: "userName",
      displayName: "User Name",
      type: "string",
      role: "value",
      rules: {
        required: val => (val != null && val !== '') || "User Name is required.",
      }
    },
    difficulty: {
      name: "difficulty",
      displayName: "Difficulty",
      type: "number",
      role: "value",
    },
    durationInSeconds: {
      name: "durationInSeconds",
      displayName: "Duration In Seconds",
      type: "number",
      role: "value",
    },
    numberOfMoves: {
      name: "numberOfMoves",
      displayName: "Number Of Moves",
      type: "number",
      role: "value",
    },
  },
  methods: {
  },
  dataSources: {
  },
}
export const UserStats = domain.types.UserStats = {
  name: "UserStats",
  displayName: "User Stats",
  get displayProp() { return this.props.name }, 
  type: "object",
  props: {
    name: {
      name: "name",
      displayName: "Name",
      type: "string",
      role: "value",
      rules: {
        required: val => (val != null && val !== '') || "Name is required.",
      }
    },
    averageDurationEasy: {
      name: "averageDurationEasy",
      displayName: "Average Duration Easy",
      type: "number",
      role: "value",
    },
    averageMovesEasy: {
      name: "averageMovesEasy",
      displayName: "Average Moves Easy",
      type: "number",
      role: "value",
    },
    averageDurationMedium: {
      name: "averageDurationMedium",
      displayName: "Average Duration Medium",
      type: "number",
      role: "value",
    },
    averageMovesMedium: {
      name: "averageMovesMedium",
      displayName: "Average Moves Medium",
      type: "number",
      role: "value",
    },
    averageDurationHard: {
      name: "averageDurationHard",
      displayName: "Average Duration Hard",
      type: "number",
      role: "value",
    },
    averageMovesHard: {
      name: "averageMovesHard",
      displayName: "Average Moves Hard",
      type: "number",
      role: "value",
    },
  },
}
export const GameService = domain.services.GameService = {
  name: "GameService",
  displayName: "Game Service",
  type: "service",
  controllerRoute: "GameService",
  methods: {
    getUserStats: {
      name: "getUserStats",
      displayName: "Get User Stats",
      transportType: "item",
      httpMethod: "POST",
      params: {
        userName: {
          name: "userName",
          displayName: "User Name",
          type: "string",
          role: "value",
          rules: {
            required: val => (val != null && val !== '') || "User Name is required.",
          }
        },
      },
      return: {
        name: "$return",
        displayName: "Result",
        type: "collection",
        itemType: {
          name: "$collectionItem",
          displayName: "",
          role: "value",
          type: "object",
          get typeDef() { return (domain.types.UserStats as ObjectType) },
        },
        role: "value",
      },
    },
  },
}

interface AppDomain extends Domain {
  enums: {
  }
  types: {
    ApplicationUser: typeof ApplicationUser
    UserGame: typeof UserGame
    UserStats: typeof UserStats
  }
  services: {
    GameService: typeof GameService
  }
}

solidify(domain)

export default domain as unknown as AppDomain
