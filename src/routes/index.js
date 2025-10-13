import contactsRouter from './contacts.js';
import authRouter from './auth.js';
import { Router } from 'express';

const router = Router();

router.use('/auth', authRouter);

router.use('/contacts', contactsRouter);

export default router;