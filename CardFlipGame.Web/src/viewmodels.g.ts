import * as $metadata from './metadata.g'
import * as $models from './models.g'
import * as $apiClients from './api-clients.g'
import { ViewModel, ListViewModel, ServiceViewModel, DeepPartial, defineProps } from 'coalesce-vue/lib/viewmodel'

export interface ApplicationUserViewModel extends $models.ApplicationUser {
  applicationUserId: number | null;
  name: string | null;
}
export class ApplicationUserViewModel extends ViewModel<$models.ApplicationUser, $apiClients.ApplicationUserApiClient, number> implements $models.ApplicationUser  {
  
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


export interface UserGameViewModel extends $models.UserGame {
  userGameId: number | null;
  userName: string | null;
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
      (c, userName: string | null) => c.getUserStats(userName),
      () => ({userName: null as string | null, }),
      (c, args) => c.getUserStats(args.userName))
    
    Object.defineProperty(this, 'getUserStats', {value: getUserStats});
    return getUserStats
  }
  
  constructor() {
    super($metadata.GameService, new $apiClients.GameServiceApiClient())
  }
}


const viewModelTypeLookup = ViewModel.typeLookup = {
  ApplicationUser: ApplicationUserViewModel,
  UserGame: UserGameViewModel,
}
const listViewModelTypeLookup = ListViewModel.typeLookup = {
  ApplicationUser: ApplicationUserListViewModel,
  UserGame: UserGameListViewModel,
}
const serviceViewModelTypeLookup = ServiceViewModel.typeLookup = {
  GameService: GameServiceViewModel,
}

