import { test, expect } from '@playwright/test';
import { Contact, createContact } from '../types/contact';
import { AddContactsPage } from '../pages/addContact';
import { setUpPageState } from '../util/session-utils';
import { ContactListPage } from '../pages/contactlist';
import { ContactDetails } from '../pages/contactDetails';
import { deleteContact, getContacts, getContactsByName } from '../apis/contactApi';

test.describe("Add Contact Tests", async () => {

  test.beforeEach("Setup Session State", async ({page, browser}) =>
  {
      await setUpPageState(page, browser)
  })

  let contact 
  let contactId

  test.beforeEach("Setup Session State", async ({page, browser, request}) =>
  {
    contact = createContact()

    let apiContacts = await getContactsByName(contact.firstName, contact.lastName, request)
    expect(apiContacts).toHaveLength(0) //Make sure the contact doesn't already exist in DB.
  })

  test('Added Contact Shows On Contact List Page', async ({ page, request }) => 
  {
    let contactListPage = new ContactListPage(page)
    let addContactsPage = new AddContactsPage(page)
    
    await addContactsPage.goToAddContact()
    await addContactsPage.addContact(contact)

    let table = await page.locator(".contactTableBodyRow")
    
    let contactRow = await contactListPage.getContact(contact.firstName!, contact.lastName!) 
    await contactRow.expectToBeVisible()

  })

  test('Added Contact Shows In API', async ({ page, request }) => 
  {
    let contactListPage = new ContactListPage(page)
    let addContactsPage = new AddContactsPage(page)
    
    await addContactsPage.goToAddContact()
    await addContactsPage.addContact(contact)

    let table = await page.locator(".contactTableBodyRow")

    let apiContacts = await getContactsByName(contact.firstName, contact.lastName, request)
    expect(apiContacts).toHaveLength(1)
  })

  test.afterEach("Clean Up Test Data", async ({page, request}) =>
  {
    let apiContacts = await getContactsByName(contact.firstName, contact.lastName, request)
    contactId = await apiContacts[0]._id
    await deleteContact(contactId, request)

    apiContacts = await getContactsByName(contact.firstName, contact.lastName, request)
     expect(apiContacts).toHaveLength(0)
  })
})