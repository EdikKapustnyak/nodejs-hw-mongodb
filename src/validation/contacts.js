import Joi from "joi";

export const createContactsSchema = Joi.object({
    name: Joi.string().min(3).max(20).required().messages({
        'string.base': 'Username should be a string',
        'string.min': 'Username should have at least 3 characters',
        'string.max': 'Username should have at most 20 characters',
        'any.required': 'Username is required',
    }),
    phoneNumber: Joi.string().required().messages({
        'string.base': 'Phone number should be a string',
        'any.required': 'Phone number is required',
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'Email must be a valid email',
        'any.required': 'Email is required',
    }),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().valid('work', 'home', 'personal').required().messages({
        'any.only': 'Contact type must be one of work, home, personal',
        'any.required': 'Contact type is required',
    }),
});

export const updateContactSchema = Joi.object({
    name: Joi.string().min(3).max(20).messages({
        'string.base': 'Username should be a string',
        'string.min': 'Username should have at least 3 characters',
        'string.max': 'Username should have at most 20 characters',
    }),
    phoneNumber: Joi.string().messages({
        'string.base': 'Phone number should be a string',
    }),
    email: Joi.string().email().messages({
        'string.email': 'Email must be a valid email',
    }),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().valid('work', 'home', 'personal').messages({
        'any.only': 'Contact type must be one of work, home, personal',
    }),
});
