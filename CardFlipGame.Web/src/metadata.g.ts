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
  get keyProp() { return this.props.id }, 
  behaviorFlags: 7 as BehaviorFlags,
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
    id: {
      name: "id",
      displayName: "Id",
      type: "string",
      role: "primaryKey",
      hidden: 3 as HiddenAreas,
    },
    userName: {
      name: "userName",
      displayName: "User Name",
      type: "string",
      role: "value",
    },
    normalizedUserName: {
      name: "normalizedUserName",
      displayName: "Normalized User Name",
      type: "string",
      role: "value",
    },
    email: {
      name: "email",
      displayName: "Email",
      type: "string",
      role: "value",
    },
    normalizedEmail: {
      name: "normalizedEmail",
      displayName: "Normalized Email",
      type: "string",
      role: "value",
    },
    emailConfirmed: {
      name: "emailConfirmed",
      displayName: "Email Confirmed",
      type: "boolean",
      role: "value",
    },
    passwordHash: {
      name: "passwordHash",
      displayName: "Password Hash",
      type: "string",
      role: "value",
    },
    securityStamp: {
      name: "securityStamp",
      displayName: "Security Stamp",
      type: "string",
      role: "value",
    },
    concurrencyStamp: {
      name: "concurrencyStamp",
      displayName: "Concurrency Stamp",
      type: "string",
      role: "value",
    },
    phoneNumber: {
      name: "phoneNumber",
      displayName: "Phone Number",
      type: "string",
      role: "value",
    },
    phoneNumberConfirmed: {
      name: "phoneNumberConfirmed",
      displayName: "Phone Number Confirmed",
      type: "boolean",
      role: "value",
    },
    twoFactorEnabled: {
      name: "twoFactorEnabled",
      displayName: "Two Factor Enabled",
      type: "boolean",
      role: "value",
    },
    lockoutEnd: {
      name: "lockoutEnd",
      displayName: "Lockout End",
      type: "date",
      dateKind: "datetime",
      role: "value",
    },
    lockoutEnabled: {
      name: "lockoutEnabled",
      displayName: "Lockout Enabled",
      type: "boolean",
      role: "value",
    },
    accessFailedCount: {
      name: "accessFailedCount",
      displayName: "Access Failed Count",
      type: "number",
      role: "value",
    },
  },
  methods: {
  },
  dataSources: {
  },
}
export const RaceGame = domain.types.RaceGame = {
  name: "RaceGame",
  displayName: "Race Game",
  get displayProp() { return this.props.raceGameId }, 
  type: "model",
  controllerRoute: "RaceGame",
  get keyProp() { return this.props.raceGameId }, 
  behaviorFlags: 7 as BehaviorFlags,
  props: {
    raceGameId: {
      name: "raceGameId",
      displayName: "Race Game Id",
      type: "number",
      role: "primaryKey",
      hidden: 3 as HiddenAreas,
    },
    playerOneId: {
      name: "playerOneId",
      displayName: "Player One Id",
      type: "string",
      role: "foreignKey",
      get principalKey() { return (domain.types.ApplicationUser as ModelType).props.id as PrimaryKeyProperty },
      get principalType() { return (domain.types.ApplicationUser as ModelType) },
      get navigationProp() { return (domain.types.RaceGame as ModelType).props.playerOne as ModelReferenceNavigationProperty },
      hidden: 3 as HiddenAreas,
      rules: {
        required: val => (val != null && val !== '') || "Player One is required.",
      }
    },
    playerOne: {
      name: "playerOne",
      displayName: "Player One",
      type: "model",
      get typeDef() { return (domain.types.ApplicationUser as ModelType) },
      role: "referenceNavigation",
      get foreignKey() { return (domain.types.RaceGame as ModelType).props.playerOneId as ForeignKeyProperty },
      get principalKey() { return (domain.types.ApplicationUser as ModelType).props.id as PrimaryKeyProperty },
      dontSerialize: true,
    },
    playerTwoId: {
      name: "playerTwoId",
      displayName: "Player Two Id",
      type: "string",
      role: "foreignKey",
      get principalKey() { return (domain.types.ApplicationUser as ModelType).props.id as PrimaryKeyProperty },
      get principalType() { return (domain.types.ApplicationUser as ModelType) },
      get navigationProp() { return (domain.types.RaceGame as ModelType).props.playerTwo as ModelReferenceNavigationProperty },
      hidden: 3 as HiddenAreas,
    },
    playerTwo: {
      name: "playerTwo",
      displayName: "Player Two",
      type: "model",
      get typeDef() { return (domain.types.ApplicationUser as ModelType) },
      role: "referenceNavigation",
      get foreignKey() { return (domain.types.RaceGame as ModelType).props.playerTwoId as ForeignKeyProperty },
      get principalKey() { return (domain.types.ApplicationUser as ModelType).props.id as PrimaryKeyProperty },
      dontSerialize: true,
    },
    player1Score: {
      name: "player1Score",
      displayName: "Player1 Score",
      type: "number",
      role: "value",
    },
    player2Score: {
      name: "player2Score",
      displayName: "Player2 Score",
      type: "number",
      role: "value",
    },
    queueBonus: {
      name: "queueBonus",
      displayName: "Queue Bonus",
      type: "number",
      role: "value",
    },
    isComplete: {
      name: "isComplete",
      displayName: "Is Complete",
      type: "boolean",
      role: "value",
    },
    canJoin: {
      name: "canJoin",
      displayName: "Can Join",
      type: "boolean",
      role: "value",
      dontSerialize: true,
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
    userId: {
      name: "userId",
      displayName: "User Id",
      type: "string",
      role: "foreignKey",
      get principalKey() { return (domain.types.ApplicationUser as ModelType).props.id as PrimaryKeyProperty },
      get principalType() { return (domain.types.ApplicationUser as ModelType) },
      get navigationProp() { return (domain.types.UserGame as ModelType).props.user as ModelReferenceNavigationProperty },
      hidden: 3 as HiddenAreas,
      rules: {
        required: val => (val != null && val !== '') || "User is required.",
      }
    },
    user: {
      name: "user",
      displayName: "User",
      type: "model",
      get typeDef() { return (domain.types.ApplicationUser as ModelType) },
      role: "referenceNavigation",
      get foreignKey() { return (domain.types.UserGame as ModelType).props.userId as ForeignKeyProperty },
      get principalKey() { return (domain.types.ApplicationUser as ModelType).props.id as PrimaryKeyProperty },
      dontSerialize: true,
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
  type: "object",
  props: {
    userId: {
      name: "userId",
      displayName: "User Id",
      type: "string",
      role: "value",
      rules: {
        required: val => (val != null && val !== '') || "User Id is required.",
      }
    },
    user: {
      name: "user",
      displayName: "User",
      type: "model",
      get typeDef() { return (domain.types.ApplicationUser as ModelType) },
      role: "value",
      dontSerialize: true,
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
        userId: {
          name: "userId",
          displayName: "User Id",
          type: "string",
          role: "value",
          rules: {
            required: val => (val != null && val !== '') || "User Id is required.",
          }
        },
      },
      return: {
        name: "$return",
        displayName: "Result",
        type: "object",
        get typeDef() { return (domain.types.UserStats as ObjectType) },
        role: "value",
      },
    },
  },
}
export const LoginService = domain.services.LoginService = {
  name: "LoginService",
  displayName: "Login Service",
  type: "service",
  controllerRoute: "LoginService",
  methods: {
    login: {
      name: "login",
      displayName: "Login",
      transportType: "item",
      httpMethod: "POST",
      params: {
        email: {
          name: "email",
          displayName: "Email",
          type: "string",
          role: "value",
          rules: {
            required: val => (val != null && val !== '') || "Email is required.",
          }
        },
        password: {
          name: "password",
          displayName: "Password",
          type: "string",
          role: "value",
          rules: {
            required: val => (val != null && val !== '') || "Password is required.",
          }
        },
      },
      return: {
        name: "$return",
        displayName: "Result",
        type: "void",
        role: "value",
      },
    },
    logout: {
      name: "logout",
      displayName: "Logout",
      transportType: "item",
      httpMethod: "POST",
      params: {
      },
      return: {
        name: "$return",
        displayName: "Result",
        type: "void",
        role: "value",
      },
    },
    createAccount: {
      name: "createAccount",
      displayName: "Create Account",
      transportType: "item",
      httpMethod: "POST",
      params: {
        name: {
          name: "name",
          displayName: "Name",
          type: "string",
          role: "value",
          rules: {
            required: val => (val != null && val !== '') || "Name is required.",
          }
        },
        email: {
          name: "email",
          displayName: "Email",
          type: "string",
          role: "value",
          rules: {
            required: val => (val != null && val !== '') || "Email is required.",
          }
        },
        password: {
          name: "password",
          displayName: "Password",
          type: "string",
          role: "value",
          rules: {
            required: val => (val != null && val !== '') || "Password is required.",
          }
        },
      },
      return: {
        name: "$return",
        displayName: "Result",
        type: "void",
        role: "value",
      },
    },
    changePassword: {
      name: "changePassword",
      displayName: "Change Password",
      transportType: "item",
      httpMethod: "POST",
      params: {
        currentPassword: {
          name: "currentPassword",
          displayName: "Current Password",
          type: "string",
          role: "value",
          rules: {
            required: val => (val != null && val !== '') || "Current Password is required.",
          }
        },
        newPassword: {
          name: "newPassword",
          displayName: "New Password",
          type: "string",
          role: "value",
          rules: {
            required: val => (val != null && val !== '') || "New Password is required.",
          }
        },
      },
      return: {
        name: "$return",
        displayName: "Result",
        type: "void",
        role: "value",
      },
    },
    isLoggedIn: {
      name: "isLoggedIn",
      displayName: "Is Logged In",
      transportType: "item",
      httpMethod: "POST",
      params: {
      },
      return: {
        name: "$return",
        displayName: "Result",
        type: "void",
        role: "value",
      },
    },
    getUserInfo: {
      name: "getUserInfo",
      displayName: "Get User Info",
      transportType: "item",
      httpMethod: "POST",
      params: {
      },
      return: {
        name: "$return",
        displayName: "Result",
        type: "model",
        get typeDef() { return (domain.types.ApplicationUser as ModelType) },
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
    RaceGame: typeof RaceGame
    UserGame: typeof UserGame
    UserStats: typeof UserStats
  }
  services: {
    GameService: typeof GameService
    LoginService: typeof LoginService
  }
}

solidify(domain)

export default domain as unknown as AppDomain
