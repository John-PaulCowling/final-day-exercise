import { Page } from '@playwright/test';
import { Contact } from '../types/contact';

export class EditContactsPage//Tempted to merge this with addContact
{
    constructor(private readonly page:Page) {}

    async UpdateContact(contact:Contact)
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

    async getFirstName()
    {
        return this.page.getByLabel("First Name").inputValue()
    }

    private async setFieldIfValueSet(fieldLabel, fieldValue)
    {
        if(typeof fieldValue !== 'undefined' && fieldValue != null)
        {
            await this.page.getByLabel(fieldLabel).fill(fieldValue);
        }
    }
}