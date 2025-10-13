import { setupServer } from "../server.js";
import { initMongoConnection } from "../db/initMangoDB.js";


const startServer = () => { 
    setupServer();
    initMongoConnection();
};

startServer();

export const SORT_ORDER = {
    ASC: 'asc',
    DESC: 'desc'
};

export const FIFTEEN_MINUTES = 15 * 60 * 1000;
export const ONE_DAY = 24 * 60 * 60 * 1000;

export const ROLES = {
    ADMIN: 'admin',
    USER: 'user'
};