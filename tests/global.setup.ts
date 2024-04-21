import {  test as setup, expect, Browser  } from "@playwright/test" 
import config from "../playwright.config"
import { login } from "../apis/loginApi";
import { storeSessionState } from "../util/session-utils";

setup('Session storage state', async ({ request }) => {
    let sessionId = await login(config.username, config.password, request)  
    expect(sessionId).toBeTruthy()
    await storeSessionState(sessionId, request)
})

