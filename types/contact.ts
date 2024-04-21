import {faker} from '@faker-js/faker'

export class Contact{
    constructor(
        readonly firstName?: string,
        readonly lastName?: string,
        readonly birthdate?: string,
        readonly email?: string,
        readonly phone?: string,
        readonly street1?: string,
        readonly street2?: string,
        readonly city?: string,
        readonly stateProvince?: string,
        readonly postalCode?: string,
        readonly country?: string,
        readonly _id?: string
    ) {}
}

export function createContact():Contact
{
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    const email = faker.internet.exampleEmail({firstName: firstName, lastName: lastName})
    const birthdate =  faker.date.birthdate().toISOString().substring(0,10)
    const phone =  faker.helpers.fromRegExp("[0-9]{10}")
    const street1 =  faker.location.secondaryAddress()
    const street2 =  faker.location.streetAddress(false)
    const state =  faker.location.state()
    const city =  faker.location.city()
    const postalCode =  faker.location.zipCode()
    const country =  faker.location.countryCode()
    return new Contact(firstName, lastName,birthdate,email,phone, street1, street2, city, state, postalCode, country)
}