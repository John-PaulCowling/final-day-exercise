import { Page } from '@playwright/test';
import config from '../playwright.config';
import { Contact } from '../types/contact';

export class AddContactsPage
{
    constructor(private readonly page:Page) {}

    async goToAddContact()
    {
        await this.page.goto(config.uiBaseUrl + "/addContact")
        await this.page.waitForLoadState('load')
    }

    async addContact(contact:Contact)
    {
        await this.setFieldIfValueSet('First Name',contact.firstName);
        await this.setFieldIfValueSet('Last Name',contact.lastName);
        await this.setFieldIfValueSet('Date of Birth',contact.birthdate);
        await this.setFieldIfValueSet('Email',contact.email);
        await this.setFieldIfValueSet('Phone',contact.phone);
        await this.setFieldIfValueSet('Street Address 1',contact.street1);
        await this.setFieldIfValueSet('Street Address 2',contact.street2);
        await this.setFieldIfValueSet('City',contact.city);
        await this.setFieldIfValueSet('State or Province',contact.stateProvince);
        await this.setFieldIfValueSet('Postal Code',contact.postalCode);
        await this.setFieldIfValueSet('Country',contact.country);
        await this.page.getByRole('button', { name: 'Submit' }).click()
    }

    private async setFieldIfValueSet(fieldName, fieldValue)
    {
        if(typeof fieldValue !== 'undefined' && fieldValue != null)
        {
            await this.page.getByLabel(fieldName).fill(fieldValue);
        }
    }
}