import { isValidObjectId } from "mongoose";
import createHttpError from "http-errors";

export const isValidId = async (req, res, next) => { 
    const {contactId} = req.body;
    if (!isValidObjectId(contactId)) { 
        throw createHttpError(404, 'Bad Request');
    };
    next();
};