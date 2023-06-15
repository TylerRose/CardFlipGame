import * as metadata from './metadata.g'
import { Model, DataSource, convertToModel, mapToModel } from 'coalesce-vue/lib/model'

export interface ApplicationUser extends Model<typeof metadata.ApplicationUser> {
  name: string | null
  id: string | null
  userName: string | null
  normalizedUserName: string | null
  email: string | null
  normalizedEmail: string | null
  emailConfirmed: boolean | null
  passwordHash: string | null
  securityStamp: string | null
  concurrencyStamp: string | null
  phoneNumber: string | null
  phoneNumberConfirmed: boolean | null
  twoFactorEnabled: boolean | null
  lockoutEnd: Date | null
  lockoutEnabled: boolean | null
  accessFailedCount: number | null
}
export class ApplicationUser {
  
  /** Mutates the input object and its descendents into a valid ApplicationUser implementation. */
  static convert(data?: Partial<ApplicationUser>): ApplicationUser {
    return convertToModel(data || {}, metadata.ApplicationUser) 
  }
  
  /** Maps the input object and its descendents to a new, valid ApplicationUser implementation. */
  static map(data?: Partial<ApplicationUser>): ApplicationUser {
    return mapToModel(data || {}, metadata.ApplicationUser) 
  }
  
  /** Instantiate a new ApplicationUser, optionally basing it on the given data. */
  constructor(data?: Partial<ApplicationUser> | {[k: string]: any}) {
    Object.assign(this, ApplicationUser.map(data || {}));
  }
}


export interface UserGame extends Model<typeof metadata.UserGame> {
  userGameId: number | null
  userId: string | null
  user: ApplicationUser | null
  difficulty: number | null
  durationInSeconds: number | null
  numberOfMoves: number | null
}
export class UserGame {
  
  /** Mutates the input object and its descendents into a valid UserGame implementation. */
  static convert(data?: Partial<UserGame>): UserGame {
    return convertToModel(data || {}, metadata.UserGame) 
  }
  
  /** Maps the input object and its descendents to a new, valid UserGame implementation. */
  static map(data?: Partial<UserGame>): UserGame {
    return mapToModel(data || {}, metadata.UserGame) 
  }
  
  /** Instantiate a new UserGame, optionally basing it on the given data. */
  constructor(data?: Partial<UserGame> | {[k: string]: any}) {
    Object.assign(this, UserGame.map(data || {}));
  }
}


export interface UserStats extends Model<typeof metadata.UserStats> {
  userId: string | null
  user: ApplicationUser | null
  averageDurationEasy: number | null
  averageMovesEasy: number | null
  averageDurationMedium: number | null
  averageMovesMedium: number | null
  averageDurationHard: number | null
  averageMovesHard: number | null
}
export class UserStats {
  
  /** Mutates the input object and its descendents into a valid UserStats implementation. */
  static convert(data?: Partial<UserStats>): UserStats {
    return convertToModel(data || {}, metadata.UserStats) 
  }
  
  /** Maps the input object and its descendents to a new, valid UserStats implementation. */
  static map(data?: Partial<UserStats>): UserStats {
    return mapToModel(data || {}, metadata.UserStats) 
  }
  
  /** Instantiate a new UserStats, optionally basing it on the given data. */
  constructor(data?: Partial<UserStats> | {[k: string]: any}) {
    Object.assign(this, UserStats.map(data || {}));
  }
}


