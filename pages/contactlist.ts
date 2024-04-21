import { Locator, Page, expect } from '@playwright/test';
import config from '../playwright.config';
import { Contact } from '../types/contact';

export class ContactListPage
{
    private readonly contactRowsLocator: Locator  = this.page.locator(".contactTableBodyRow")

    constructor(private readonly page: Page){ }

    async goToContactList():Promise<void>
    {
        await this.page.goto(config.uiBaseUrl + "/contactList")
        await this.page.waitForLoadState('load')
    }


    async getAllContacts():Promise<ContactListItem[]>
    {
        let rows = await this.contactRowsLocator.all()
        return rows.map((rowLocator) => new ContactListItem(rowLocator))
    }



    async getContact(firstName:string, lastName:string):Promise<ContactListItem>
    {
        let fullName = `${firstName} ${lastName}`
        let contactRow = await this.contactRowsLocator.filter(
            {has: this.page.getByRole('cell', { name: `${fullName}`}) }
        ).first()
        
        return new ContactListItem(contactRow)
    }
}


export class ContactListItem
{
    constructor(readonly rowLocator:Locator) {}

    async expectToBeVisible()
    {
        return expect(this.rowLocator).toHaveValue
    }
    async expectNotToBeVisible()
    {
        return expect(this.rowLocator).not.toBeVisible()
    }

    async goToContactDetailsPage()
    {
        return this.rowLocator.click()
    }

    async getId()
    {
        return this.rowLocator.locator("td").first().textContent()
    }
}