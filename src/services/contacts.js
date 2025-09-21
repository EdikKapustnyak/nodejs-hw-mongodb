import { getContactsCollection } from "../db/model/contacts.js";

export const getAllContact = async () => { 
    const contacts = await getContactsCollection.find();
    return contacts;
};

export const getContactById = async (contactId) => { 
    const contact = await getContactsCollection.findById(contactId);
    return contact;
};