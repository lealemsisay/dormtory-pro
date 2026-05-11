import express from 'express';
import { login, changePassword, getMe } from '../controllers/authController';
import { protect } from '../middleware/auth';

const router = express.Router();

router.post('/login', login);
router.post('/change-password', protect, changePassword);
router.get('/me', protect, getMe);

export default router;
