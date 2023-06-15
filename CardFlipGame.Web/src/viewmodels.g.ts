import * as $metadata from './metadata.g'
import * as $models from './models.g'
import * as $apiClients from './api-clients.g'
import { ViewModel, ListViewModel, ServiceViewModel, DeepPartial, defineProps } from 'coalesce-vue/lib/viewmodel'

export interface ApplicationUserViewModel extends $models.ApplicationUser {
  name: string | null;
  id: string | null;
  userName: string | null;
  normalizedUserName: string | null;
  email: string | null;
  normalizedEmail: string | null;
  emailConfirmed: boolean | null;
  passwordHash: string | null;
  securityStamp: string | null;
  concurrencyStamp: string | null;
  phoneNumber: string | null;
  phoneNumberConfirmed: boolean | null;
  twoFactorEnabled: boolean | null;
  lockoutEnd: Date | null;
  lockoutEnabled: boolean | null;
  accessFailedCount: number | null;
}
export class ApplicationUserViewModel extends ViewModel<$models.ApplicationUser, $apiClients.ApplicationUserApiClient, string> implements $models.ApplicationUser  {
  
  constructor(initialData?: DeepPartial<$models.ApplicationUser> | null) {
    super($metadata.ApplicationUser, new $apiClients.ApplicationUserApiClient(), initialData)
  }
}
defineProps(ApplicationUserViewModel, $metadata.ApplicationUser)

export class ApplicationUserListViewModel extends ListViewModel<$models.ApplicationUser, $apiClients.ApplicationUserApiClient, ApplicationUserViewModel> {
  
  constructor() {
    super($metadata.ApplicationUser, new $apiClients.ApplicationUserApiClient())
  }
}


export interface RaceGameViewModel extends $models.RaceGame {
  raceGameId: number | null;
  playerOneId: string | null;
  playerOne: ApplicationUserViewModel | null;
  playerTwoId: string | null;
  playerTwo: ApplicationUserViewModel | null;
  player1Score: number | null;
  player2Score: number | null;
  queueBonus: number | null;
  isComplete: boolean | null;
  canJoin: boolean | null;
}
export class RaceGameViewModel extends ViewModel<$models.RaceGame, $apiClients.RaceGameApiClient, number> implements $models.RaceGame  {
  
  constructor(initialData?: DeepPartial<$models.RaceGame> | null) {
    super($metadata.RaceGame, new $apiClients.RaceGameApiClient(), initialData)
  }
}
defineProps(RaceGameViewModel, $metadata.RaceGame)

export class RaceGameListViewModel extends ListViewModel<$models.RaceGame, $apiClients.RaceGameApiClient, RaceGameViewModel> {
  
  constructor() {
    super($metadata.RaceGame, new $apiClients.RaceGameApiClient())
  }
}


export interface UserGameViewModel extends $models.UserGame {
  userGameId: number | null;
  userId: string | null;
  user: ApplicationUserViewModel | null;
  difficulty: number | null;
  durationInSeconds: number | null;
  numberOfMoves: number | null;
}
export class UserGameViewModel extends ViewModel<$models.UserGame, $apiClients.UserGameApiClient, number> implements $models.UserGame  {
  
  constructor(initialData?: DeepPartial<$models.UserGame> | null) {
    super($metadata.UserGame, new $apiClients.UserGameApiClient(), initialData)
  }
}
defineProps(UserGameViewModel, $metadata.UserGame)

export class UserGameListViewModel extends ListViewModel<$models.UserGame, $apiClients.UserGameApiClient, UserGameViewModel> {
  
  constructor() {
    super($metadata.UserGame, new $apiClients.UserGameApiClient())
  }
}


export class GameServiceViewModel extends ServiceViewModel<typeof $metadata.GameService, $apiClients.GameServiceApiClient> {
  
  public get getUserStats() {
    const getUserStats = this.$apiClient.$makeCaller(
      this.$metadata.methods.getUserStats,
      (c, userId: string | null) => c.getUserStats(userId),
      () => ({userId: null as string | null, }),
      (c, args) => c.getUserStats(args.userId))
    
    Object.defineProperty(this, 'getUserStats', {value: getUserStats});
    return getUserStats
  }
  
  constructor() {
    super($metadata.GameService, new $apiClients.GameServiceApiClient())
  }
}


export class LoginServiceViewModel extends ServiceViewModel<typeof $metadata.LoginService, $apiClients.LoginServiceApiClient> {
  
  public get login() {
    const login = this.$apiClient.$makeCaller(
      this.$metadata.methods.login,
      (c, email: string | null, password: string | null) => c.login(email, password),
      () => ({email: null as string | null, password: null as string | null, }),
      (c, args) => c.login(args.email, args.password))
    
    Object.defineProperty(this, 'login', {value: login});
    return login
  }
  
  public get logout() {
    const logout = this.$apiClient.$makeCaller(
      this.$metadata.methods.logout,
      (c) => c.logout(),
      () => ({}),
      (c, args) => c.logout())
    
    Object.defineProperty(this, 'logout', {value: logout});
    return logout
  }
  
  public get createAccount() {
    const createAccount = this.$apiClient.$makeCaller(
      this.$metadata.methods.createAccount,
      (c, name: string | null, email: string | null, password: string | null) => c.createAccount(name, email, password),
      () => ({name: null as string | null, email: null as string | null, password: null as string | null, }),
      (c, args) => c.createAccount(args.name, args.email, args.password))
    
    Object.defineProperty(this, 'createAccount', {value: createAccount});
    return createAccount
  }
  
  public get changePassword() {
    const changePassword = this.$apiClient.$makeCaller(
      this.$metadata.methods.changePassword,
      (c, currentPassword: string | null, newPassword: string | null) => c.changePassword(currentPassword, newPassword),
      () => ({currentPassword: null as string | null, newPassword: null as string | null, }),
      (c, args) => c.changePassword(args.currentPassword, args.newPassword))
    
    Object.defineProperty(this, 'changePassword', {value: changePassword});
    return changePassword
  }
  
  public get isLoggedIn() {
    const isLoggedIn = this.$apiClient.$makeCaller(
      this.$metadata.methods.isLoggedIn,
      (c) => c.isLoggedIn(),
      () => ({}),
      (c, args) => c.isLoggedIn())
    
    Object.defineProperty(this, 'isLoggedIn', {value: isLoggedIn});
    return isLoggedIn
  }
  
  public get getUserInfo() {
    const getUserInfo = this.$apiClient.$makeCaller(
      this.$metadata.methods.getUserInfo,
      (c) => c.getUserInfo(),
      () => ({}),
      (c, args) => c.getUserInfo())
    
    Object.defineProperty(this, 'getUserInfo', {value: getUserInfo});
    return getUserInfo
  }
  
  constructor() {
    super($metadata.LoginService, new $apiClients.LoginServiceApiClient())
  }
}


const viewModelTypeLookup = ViewModel.typeLookup = {
  ApplicationUser: ApplicationUserViewModel,
  RaceGame: RaceGameViewModel,
  UserGame: UserGameViewModel,
}
const listViewModelTypeLookup = ListViewModel.typeLookup = {
  ApplicationUser: ApplicationUserListViewModel,
  RaceGame: RaceGameListViewModel,
  UserGame: UserGameListViewModel,
}
const serviceViewModelTypeLookup = ServiceViewModel.typeLookup = {
  GameService: GameServiceViewModel,
  LoginService: LoginServiceViewModel,
}

