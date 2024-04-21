import { test, expect } from '@playwright/test';
import { login } from '../apis/loginApi';
import { addContact, deleteContact, getContactsByName } from '../apis/contactApi';
import config from '../playwright.config';
import { Contact, createContact } from '../types/contact';
import { beforeEach } from 'node:test';
import { ContactListPage } from '../pages/contactlist';
import { ContactDetails } from '../pages/contactDetails';
import { EditContactsPage } from '../pages/editContact';
import { setUpPageState } from '../util/session-utils';

test.describe("Edit Contact Tests", async () => {

    test.beforeEach("Setup Session State", async ({page, browser}) =>
    {
        await setUpPageState(page, browser)
    })

    let contact 
    let contactId

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

    test('Edit Contact', async ({ page, request }) => {
        let contactListPage = new ContactListPage(page)
        let contactDetailsPage = new ContactDetails(page)
        let editContactsPage = new EditContactsPage(page)

        await contactListPage.goToContactList()
        let contactRow = await contactListPage.getContact(contact.firstName!, contact.lastName!) 
        await contactRow.goToContactDetailsPage()
        await contactDetailsPage.gotoEditContact()


        const newFirstName = "Hello";
        await editContactsPage.UpdateContact(new Contact(newFirstName))
        expect(await editContactsPage.getFirstName()).toBe(newFirstName)

        await contactListPage.goToContactList()
        contactRow = await contactListPage.getContact(newFirstName, contact.lastName!) 
        await contactRow.expectToBeVisible()
   })

   test.afterEach("Clean Up Test Data", async ({page, request}) =>
    {          
        let apiContacts = await getContactsByName(contact.firstName, contact.lastName, request)
        contactId = await apiContacts[0]._id
        await deleteContact(contactId, request)
    
        apiContacts = await getContactsByName(contact.firstName, contact.lastName, request)
         expect(apiContacts).toHaveLength(0)
    })
});