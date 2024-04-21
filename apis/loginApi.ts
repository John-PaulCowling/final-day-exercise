import { APIRequestContext, expect } from '@playwright/test'
import config from '../playwright.config'

export async function login(username:string, password:string, request:APIRequestContext): Promise<string>
{
    let authResponse = await request.post(`${config.apiBaseURL}/users/login`,
      { 
        data:{
            "email":    username,
            "password": password
        }
      }
    )
    expect(authResponse).toBeOK()
  
    let authResponseJson = await authResponse.json() 

    return authResponseJson.token
}
