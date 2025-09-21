import pino from "pino-http";
import cors from "cors";
import express from 'express';
import { getEnvVar } from "./utils/getEnvVar.js";
import { getAllContact, getContactById } from "./services/contacts.js";

const PORT = Number(getEnvVar('PORT', '3000'));

export const setupServer = () => {
    const app = express();

    app.use(cors());
       
    app.use(
        pino({
            transport: {
                target: 'pino-pretty',
            },
        }),
    );

    app.get('/', (req, res) => { 
        res.json({
            message: 'Server is started'
        });
    });

    app.get('/contacts', async (req, res, next) => { 
        const contacts = await getAllContact();
        res.json({
            status: 200,
            message: "Successfully found contacts!",
            data: contacts
          });
    });

    app.get('/contacts/:contactById', async (req, res, next) => { 
        const { contactById } = req.params;
        const contact = await getContactById(contactById);
        if (!contact) { 
            res.status(404).json({
              message: 'Contact not found'
            });
            return;
        }; 
        res.status(200).json({
            status: 200,
            message: `Successfully found contact with id ${contactById}!`,
            data: contact
          });
    });

    app.use((err, req, res, next) => { 
        res.status(500).json({
            message: 'Something went wrong',
            error: err.message
        });
    });

    app.use(( req, res, next) => { 
        res.status(404).json({
            message: 'Not found',
        });
    });

    app.listen(PORT, () => { 
        console.log(`Server is running on port ${PORT}`);
    });
};