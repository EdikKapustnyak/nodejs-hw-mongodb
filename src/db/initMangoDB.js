import mongoose from "mongoose";
import { getEnvVar } from "../utils/getEnvVar.js";

export const initMongoConnection = async () =>{ 
   try { 
       const user = getEnvVar('MANGODB_USER');
       const pwd = getEnvVar('MANGODB_PASSWORD');
       const url = getEnvVar('MANGODB_URL');
       const db = getEnvVar('MANGODB_DB');
       await mongoose.connect(`mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority`,);
       console.log('Mongo connection successfully established!');
    } catch (e) {
         console.log('Error while setting up mongo connection', e);
        return e;
    }
};