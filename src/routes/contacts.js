import { Router } from "express";
import { deleteContactController, getAllContactController, getContactByIdController, patchContactController, postContactController } from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { createContactsSchema, updateContactSchema } from "../validation/contacts.js";
import { validateBody } from "../middlewares/validateBody.js";
import { isValidId } from "../middlewares/isValidId.js";

const router = Router();

router.get('/contacts', ctrlWrapper(getAllContactController));

router.get('/contacts/:contactId', isValidId,  ctrlWrapper(getContactByIdController));

router.post('/contacts', validateBody(createContactsSchema),  ctrlWrapper(postContactController));

router.patch('/contacts/:contactId', isValidId, validateBody(updateContactSchema), ctrlWrapper(patchContactController));

router.delete('/contacts/:contactId', isValidId, ctrlWrapper(deleteContactController));

export default router;