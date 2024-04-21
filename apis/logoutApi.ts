import { APIRequestContext, expect } from '@playwright/test'
import config from '../playwright.config'
import { getSessionHeaders } from "../util/session-utils"

export async function logout(request:APIRequestContext): Promise<void>
{
  let headers = getSessionHeaders();

  let authResponse = await request.post(`${config.apiBaseURL}/users/logout`,
    { 
      headers: headers
    }
  )

  expect(authResponse).toBeOK()
}
