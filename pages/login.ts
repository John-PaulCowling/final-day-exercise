import { Page } from '@playwright/test';
import config from '../playwright.config';


export class goToLoginPage{
    constructor(private readonly page:Page) {}

    async goToLoginPage()
    {
        await this.page.goto(config.uiBaseUrl)
    }

    async login(username:string, password:string)
    {
        await this.page.getByPlaceholder('Email').fill(username)
        await this.page.getByPlaceholder('Password').fill(password)
        await this.page.getByRole('button', { name: 'Submit' }).click()
        await this.page.waitForLoadState('load')
    }
}
