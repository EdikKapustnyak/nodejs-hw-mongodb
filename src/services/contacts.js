import { ContactsCollection } from "../db/model/contacts.js";

export const getAllContact = async () => { 
    const contacts = await ContactsCollection.find();
    return contacts;
};

export const getContactById = async (contactId) => { 
    const contact = await ContactsCollection.findById(contactId);
    return contact;
};

export const postContact = async (payload) => { 
    const contact = await ContactsCollection.create(payload);
    return contact;
};

export const updateContact = async (contactId, payload, options={}) => { 
    const contact = await ContactsCollection.findOneAndUpdate(
        {_id: contactId},
        payload,
        {
            new: true,
            includeResultMetadata: true,
            ...options
        }
    );

    if(!contact) return null;

    return {
        contact: contact.value,
        isNew: Boolean(contact?.lastErrorObject?.upserted)
    };
};

export const deleteContact = async (contactId) => {
    const contact = await ContactsCollection.findOneAndDelete({
        _id: contactId,
    });
    return contact;
};