import { test, expect } from '@playwright/test';
import { addContact, getContactsByName } from '../apis/contactApi';
import { Contact, createContact } from '../types/contact';
import { ContactListPage } from '../pages/contactlist';
import { ContactDetails } from '../pages/contactDetails';
import { EditContactsPage } from '../pages/editContact';
import { setUpPageState } from '../util/session-utils';

test.describe("Delete Contact Tests", async () => {

    test.beforeEach("Setup Session State", async ({page, browser}) =>
    {
        await setUpPageState(page, browser)
    })

    let contact 

    test.beforeEach("Insert Test Data", async ({page, request}) =>
    {
        contact = createContact()
        let apiContacts = await getContactsByName(contact.firstName, contact.lastName, request)
        expect(apiContacts).toHaveLength(0) //Make sure it hasn't already been added.

        let addContactResponse = await addContact(contact, request)
        await expect(addContactResponse).toBeOK()

        apiContacts = await getContactsByName(contact.firstName, contact.lastName, request)
        expect(apiContacts).toHaveLength(1)
    })

    test('Delete Contact', async ({ page, request }) => 
    {        
        let contactListPage = new ContactListPage(page)
        let contactDetailsPage = new ContactDetails(page)

        await contactListPage.goToContactList()

        let contactRow = await contactListPage.getContact(contact.firstName!, contact.lastName!) 

        await contactRow.goToContactDetailsPage()
        await contactDetailsPage.deleteContact()
        await contactRow.expectNotToBeVisible() //Make sure it hasn't already deleted added.
   })
});