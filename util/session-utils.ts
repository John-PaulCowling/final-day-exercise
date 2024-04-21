import { APIRequestContext, Browser, BrowserContextOptions, Page } from "@playwright/test"

const authFile = 'playwright/.auth/session.json';

export async function setUpPageState(page:Page, browser:Browser)
{
    let context = await browser.newContext({ storageState: authFile })
    let cookies = await context.cookies()// This seems really clunky. But
    await page.context().addCookies(cookies)
}


export async function storeSessionState(sessionId:string, request:APIRequestContext)
{
    await request.storageState({ path: authFile })
    process.env.SESSION_ID = sessionId
}

export function getSessionHeaders(): { [key: string]: string; } {
    let sessionToken = process.env.SESSION_ID;
    let headers: { [key: string]: string; } = { "Authorization": `Bearer ${sessionToken}` };
    return headers;
}