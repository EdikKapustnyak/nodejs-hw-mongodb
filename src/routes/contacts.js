import { Router } from "express";
import { deleteContactController, getAllContactController, getContactByIdController, patchContactController, postContactController } from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { createContactsSchema, updateContactSchema } from "../validation/contacts.js";
import { validateBody } from "../middlewares/validateBody.js";
import { isValidId } from "../middlewares/isValidId.js";
import { authenticate } from "../middlewares/authenticate.js";
import { upload } from "../middlewares/multer.js";


const router = Router();

router.use(authenticate);

router.get('/', ctrlWrapper(getAllContactController));

router.get('/:contactId',  isValidId,  ctrlWrapper(getContactByIdController));

router.post('/', validateBody(createContactsSchema), upload.single('photo'),  ctrlWrapper(postContactController));

router.patch('/:contactId',  isValidId, validateBody(updateContactSchema), upload.single('photo'), ctrlWrapper(patchContactController));

router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactController));

export default router;