import {  test as setup, expect, Browser  } from "@playwright/test" 
import config from "../playwright.config"
import { login } from "../apis/loginApi";
import { storeSessionState } from "../util/session-utils";

setup('Session storage state', async ({ request }) => {
    //log out here.
})

