import { setupServer } from "./server.js";
import { initMongoConnection } from "./db/initMangoDB.js";


const startServer = () => { 
    setupServer();
    initMongoConnection();
};

startServer();

export const SORT_ORDER = {
    ASC: 'asc',
    DESC: 'desc'
}