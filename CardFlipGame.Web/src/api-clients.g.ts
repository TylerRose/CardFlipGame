import * as $metadata from './metadata.g'
import * as $models from './models.g'
import { AxiosClient, ModelApiClient, ServiceApiClient, ItemResult, ListResult } from 'coalesce-vue/lib/api-client'
import { AxiosPromise, AxiosResponse, AxiosRequestConfig } from 'axios'

export class ApplicationUserApiClient extends ModelApiClient<$models.ApplicationUser> {
  constructor() { super($metadata.ApplicationUser) }
}


export class UserGameApiClient extends ModelApiClient<$models.UserGame> {
  constructor() { super($metadata.UserGame) }
}


export class GameServiceApiClient extends ServiceApiClient<typeof $metadata.GameService> {
  constructor() { super($metadata.GameService) }
  public getUserStats(userName: string | null, $config?: AxiosRequestConfig): AxiosPromise<ItemResult<$models.UserStats[]>> {
    const $method = this.$metadata.methods.getUserStats
    const $params =  {
      userName,
    }
    return this.$invoke($method, $params, $config)
  }
  
}


