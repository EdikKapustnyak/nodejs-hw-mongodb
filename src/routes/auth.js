import { Router } from "express";
import { validateBody } from "../middlewares/validateBody.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { loginUserController, logoutUserController, refreshUserSessionController, registerUserController } from "../controllers/auth.js";
import { loginUserSchema, registerUserSchema } from "../validation/auth.js";
import { resetRequestTokenController } from "../controllers/auth.js";
import { requestResetEmailSchema, resetPasswordSchema } from "../validation/auth.js";
import { resetPasswordController } from "../controllers/auth.js";
const router = Router();

router.post('/register', validateBody(registerUserSchema), ctrlWrapper(registerUserController));

router.post('/login', validateBody(loginUserSchema), ctrlWrapper(loginUserController));

router.post('/logout', ctrlWrapper(logoutUserController));

router.post('/refresh', ctrlWrapper(refreshUserSessionController));

router.post('/send-reset-email', validateBody(requestResetEmailSchema), ctrlWrapper(resetRequestTokenController));

router.post('/reset-password', validateBody(resetPasswordSchema), ctrlWrapper(resetPasswordController));

export default router;