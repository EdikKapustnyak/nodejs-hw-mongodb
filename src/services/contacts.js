import { ContactsCollection } from "../db/model/contacts.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";
import { SORT_ORDER } from "../index.js";

export const getAllContact = async (
    page,
    perPage,
    sortBy = '_id',
    sortOrder = SORT_ORDER.ASC,
    filter = {}
  ) => {
    const limit = perPage;
    const skip = (page - 1) * perPage;
  
    const contactsQuery = ContactsCollection.find();
  
    if (filter.name) {
      contactsQuery.where('name').regex(new RegExp(filter.name, 'i'));
    }
    if (typeof filter.isFavourite === 'boolean') {
      contactsQuery.where('isFavourite').equals(filter.isFavourite);
    }
    if (filter.contactType) {
      contactsQuery.where('contactType').equals(filter.contactType);
    }
  
    const filterObj = contactsQuery.getQuery();
  
    const [contactsCount, contacts] = await Promise.all([
      ContactsCollection.countDocuments(filterObj), 
      contactsQuery.skip(skip).limit(limit).sort({ [sortBy]: sortOrder }).exec() 
    ]);
  
    const paginationData = calculatePaginationData(contactsCount, page, perPage);
  
    return {
      data: contacts,
      ...paginationData,
    };
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

    if(!contact || !contact.value) return null;

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