import * as $metadata from './metadata.g'
import * as $models from './models.g'
import { AxiosClient, ModelApiClient, ServiceApiClient, ItemResult, ListResult } from 'coalesce-vue/lib/api-client'
import { AxiosPromise, AxiosResponse, AxiosRequestConfig } from 'axios'

export class ApplicationUserApiClient extends ModelApiClient<$models.ApplicationUser> {
  constructor() { super($metadata.ApplicationUser) }
}


export class RaceGameApiClient extends ModelApiClient<$models.RaceGame> {
  constructor() { super($metadata.RaceGame) }
}


export class UserGameApiClient extends ModelApiClient<$models.UserGame> {
  constructor() { super($metadata.UserGame) }
}


export class GameServiceApiClient extends ServiceApiClient<typeof $metadata.GameService> {
  constructor() { super($metadata.GameService) }
  public getUserStats(userId: string | null, $config?: AxiosRequestConfig): AxiosPromise<ItemResult<$models.UserStats>> {
    const $method = this.$metadata.methods.getUserStats
    const $params =  {
      userId,
    }
    return this.$invoke($method, $params, $config)
  }
  
}


export class LoginServiceApiClient extends ServiceApiClient<typeof $metadata.LoginService> {
  constructor() { super($metadata.LoginService) }
  public login(email: string | null, password: string | null, $config?: AxiosRequestConfig): AxiosPromise<ItemResult<void>> {
    const $method = this.$metadata.methods.login
    const $params =  {
      email,
      password,
    }
    return this.$invoke($method, $params, $config)
  }
  
  public logout($config?: AxiosRequestConfig): AxiosPromise<ItemResult<void>> {
    const $method = this.$metadata.methods.logout
    const $params =  {
    }
    return this.$invoke($method, $params, $config)
  }
  
  public createAccount(name: string | null, email: string | null, password: string | null, $config?: AxiosRequestConfig): AxiosPromise<ItemResult<void>> {
    const $method = this.$metadata.methods.createAccount
    const $params =  {
      name,
      email,
      password,
    }
    return this.$invoke($method, $params, $config)
  }
  
  public changePassword(currentPassword: string | null, newPassword: string | null, $config?: AxiosRequestConfig): AxiosPromise<ItemResult<void>> {
    const $method = this.$metadata.methods.changePassword
    const $params =  {
      currentPassword,
      newPassword,
    }
    return this.$invoke($method, $params, $config)
  }
  
  public isLoggedIn($config?: AxiosRequestConfig): AxiosPromise<ItemResult<void>> {
    const $method = this.$metadata.methods.isLoggedIn
    const $params =  {
    }
    return this.$invoke($method, $params, $config)
  }
  
  public getUserInfo($config?: AxiosRequestConfig): AxiosPromise<ItemResult<$models.ApplicationUser>> {
    const $method = this.$metadata.methods.getUserInfo
    const $params =  {
    }
    return this.$invoke($method, $params, $config)
  }
  
}


