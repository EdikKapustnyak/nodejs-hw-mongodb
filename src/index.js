import { setupServer } from "./server.js";
import { initMongoConnection } from "./db/initMangoDB.js";
import { createDirIfNotExists } from "./utils/createDirIfNotExist.js";
import { UPLOAD_DIR } from "./constants/photo.js";
import { TEMP_UPLOAD_DIR } from "./constants/photo.js";

const startServer = async() => { 
    await initMongoConnection();
    await createDirIfNotExists(TEMP_UPLOAD_DIR);
    await createDirIfNotExists(UPLOAD_DIR);
    setupServer();
};

startServer();