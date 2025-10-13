import { Router } from "express";
import { deleteContactController, getAllContactController, getContactByIdController, patchContactController, postContactController } from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { createContactsSchema, updateContactSchema } from "../validation/contacts.js";
import { validateBody } from "../middlewares/validateBody.js";
import { isValidId } from "../middlewares/isValidId.js";
import { authenticate } from "../middlewares/authenticate.js";
import { checkRoles } from "../middlewares/checkRoles.js";
import { ROLES } from "../constants/index.js";

const router = Router();

router.use(authenticate);

router.get('/', checkRoles(ROLES.ADMIN), ctrlWrapper(getAllContactController));

router.get('/contacts/:contactId', checkRoles(ROLES.ADMIN , ROLES.USER), isValidId,  ctrlWrapper(getContactByIdController));

router.post('/', checkRoles(ROLES.ADMIN,), validateBody(createContactsSchema),  ctrlWrapper(postContactController));

router.patch('/:contactId', checkRoles(ROLES.ADMIN, ROLES.USER), isValidId, validateBody(updateContactSchema), ctrlWrapper(patchContactController));

router.delete('/:contactId', checkRoles(ROLES.ADMIN), isValidId, ctrlWrapper(deleteContactController));

export default router;