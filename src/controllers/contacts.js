import { getContactById, getAllContact, postContact, updateContact, deleteContact } from "../services/contacts.js";
import createHttpError from 'http-errors';
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseFilterParams } from "../utils/parseFilterParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";

export const getAllContactController = async (req, res, next) => {
    try {
        const {page, perPage} = parsePaginationParams(req.query);
        const {sortBy, sortOrder} = parseSortParams(req.query);
        const filter = parseFilterParams(req.query);

        const contacts = await getAllContact(page, perPage, sortBy, sortOrder, filter);
        
        res.json({
            status: 200,
            message: "Successfully found contacts!",
            data: contacts
        });
    } catch (err) {
        next(err);
    }
};

export const getContactByIdController = async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (!contact) { 
        throw createHttpError(404, "Contact not found!");
    }; 
    res.status(200).json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: contact
      });
};

export const postContactController = async (req, res) => { 
    const contact = await postContact(req.body);
    res.status(201).json({
        status: 201,
        message: `Successfully created a contact!`,
        data: contact,
    });
};

export const patchContactController = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await updateContact(contactId, req.body);

    if (!result) {
        next(createHttpError(404, 'Contact not found'));
        return;
    }
    
    res.status(200).json({
        status: 200,
        message: "Successfully patched a contact!",
        data: result.contact
    });
};


export const deleteContactController = async (req, res, next) => { 
    const {contactId} = req.params;
    const contact = await deleteContact(contactId);

    if (!contact) { 
        next(createHttpError(404, 'Contact not found'));
        return;
    }
    res.status(204).send();
};