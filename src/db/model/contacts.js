import { model, Schema } from 'mongoose';

const contactsShema = new Schema(
    { 
    name: {
        type: String,
        require: true,
    }, 
    phoneNumber: {
        type: String,
        require: true,
    },
    email: { 
        type: String,
        require: false
    },
    isFavourite: {
        type: Boolean,
        default: false
    },
    contactType: {
        type: String,
        enum: ['work', 'home', 'personal'],
        default: 'personal',
    },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export const getContactsCollection = new model('contacts', contactsShema);