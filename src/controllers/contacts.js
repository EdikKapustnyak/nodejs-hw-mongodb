import { getContactById, getAllContact, postContact, updateContact, deleteContact,} from "../services/contacts.js";
import createHttpError from "http-errors";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseFilterParams } from "../utils/parseFilterParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";
import { saveFileToCloudinary } from "../utils/saveFileToCloudinary.js";
import { saveFileToUploadDir } from "../utils/saveFileToUploadDir.js";  
import { getEnvVar } from "../utils/getEnvVar.js";

export const getAllContactController = async (req, res, next) => {
    try {
      const { page, perPage } = parsePaginationParams(req.query);
      const { sortBy, sortOrder } = parseSortParams(req.query);
      const filter = parseFilterParams(req.query);
  
      const contacts = await getAllContact(page, perPage, sortBy, sortOrder, filter, req.user._id);
  
      res.json({
        status: 200,
        message: "Successfully found contacts!",
        ...contacts,
      });
    } catch (err) {
      next(err);
    }
};

export const getContactByIdController = async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const userId = req.user._id;
  
      const contact = await getContactById(contactId, userId);
  
      if (!contact) {
        throw createHttpError(404, "Contact not found!");
      }
  
      res.status(200).json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: contact,
      });
    } catch (err) {
      next(err);
    }
};
  
export const postContactController = async (req, res, next) => {
    try {
      const photo = req.file;
      let photoUrl;
  
      if (photo) {
        if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
          photoUrl = await saveFileToCloudinary(photo);
        } else {
          photoUrl = await saveFileToUploadDir(photo);
        }
      }
  
      const contact = await postContact({ ...req.body, photo: photoUrl }, req.user._id);
      res.status(201).json({
        status: 201,
        message: "Successfully created a contact!",
        data: contact,
      });
    } catch (err) {
      next(err);
    }
  };
  
export const patchContactController = async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const userId = req.user._id;
      const photo = req.file;
  
      let photoUrl;
    
      if (photo) {
        if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
          photoUrl = await saveFileToCloudinary(photo);
        } else {
          photoUrl = await saveFileToUploadDir(photo);
        }
      }
  
      const result = await updateContact(contactId, {...req.body, photo: photoUrl}, userId);
  
      if (!result) {
        return next(createHttpError(404, "Contact not found"));
      }
  
      res.status(200).json({
        status: 200,
        message: "Successfully patched a contact!",
        data: result.contact,
      });
    } catch (err) {
      next(err);
    }
};
  
export const deleteContactController = async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const userId = req.user._id;
  
      const contact = await deleteContact(contactId, userId);
  
      if (!contact) {
        return next(createHttpError(404, "Contact not found"));
      }
  
      res.status(204).send();
    } catch (err) {
      next(err);
    }
};  