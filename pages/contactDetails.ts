import { Locator, Page } from '@playwright/test';

export class ContactDetails
{
    private readonly editButton:Locator  = this.page.getByRole("button", {name : "Edit Contact"})
    private readonly deleteButton:Locator  = this.page.getByRole("button", {name : "Delete Contact"})
    constructor(readonly page) {}

    async gotoEditContact()
    {
        return await this.editButton.click()
    }
    async deleteContact()
    {
        this.page.on('dialog', async dialog => { 
            await dialog.accept();
          });

        return await this.deleteButton.click()
    }
}