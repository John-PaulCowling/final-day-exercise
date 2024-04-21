import { Contact } from "../types/contact"
import { APIRequestContext, expect } from '@playwright/test'
import config from '../playwright.config'
import { getSessionHeaders } from "../util/session-utils"

export async function addContact(contact: Contact, request:APIRequestContext)
{ 
    let url = config.apiBaseURL + "/contacts"
    let headers = getSessionHeaders();

    let response = await request.post(url, 
        {data:contact, headers: headers})

    expect(response).toBeOK()
    return response
}

export async function getContacts(request:APIRequestContext):Promise<Contact[]>
{ 
    let url = config.apiBaseURL + "/contacts"
    let headers = getSessionHeaders();

    let response = await request.get(url, { headers: headers})

    expect(response).toBeOK()

    var contactList = await response.json()
    
    return contactList.map((jsonContact) => Object.assign(new Contact(), jsonContact))
}

export async function getContactsByName(firstName:string, lastName:string, request:APIRequestContext):Promise<Contact[]>
{ 
    let apiContacts = await getContacts(request)
    return apiContacts.filter((value) => (value.firstName == firstName && value.lastName == lastName))
  
}

export async function deleteContact(id :string, request:APIRequestContext)
{ 
    let url = config.apiBaseURL + "/contacts/" + id
    let headers = getSessionHeaders();

    let response = await request.delete(url, {headers: headers})

    expect(response).toBeOK()
    return response
}

