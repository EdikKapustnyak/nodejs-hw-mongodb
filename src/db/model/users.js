import { model, Schema } from "mongoose";

const usersSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: { 
            type: String, 
            unique: true,
            required: true,
        },
        password: { 
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
          }
          
    },
    { 
        timestamps: true,
        versionKey: false
    }
);

usersSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};

export const UserCollection = model('users', usersSchema);