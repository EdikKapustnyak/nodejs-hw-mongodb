import pino from "pino-http";
import cors from "cors";
import express from 'express';
import { getEnvVar } from "./utils/getEnvVar.js";
import router from './routes/index.js';
import { errorHandler } from "./middlewares/errorHandler.js";
import cookieParser from "cookie-parser";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import { UPLOAD_DIR } from "./constants/photo.js";
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';

const PORT = Number(getEnvVar('PORT', '3000'));

export const setupServer = () => {
    const app = express();

    const swaggerFile = JSON.parse(fs.readFileSync(path.resolve('docs/swagger.json'), 'utf8'));
    
    app.use(express.json({
        type: ['application/json', 'application/vnd.api+json'],
        limit: '100kb',
    }));
    
    app.use(cors());
    app.use(cookieParser());
    
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
    
    app.use('/uploads', express.static(UPLOAD_DIR));

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
    
    app.use(router);
    
    app.use(notFoundHandler);
    
    app.use(errorHandler); 
    
    app.listen(PORT, () => { 
        console.log(`Server is running on port ${PORT}`);
    });
};