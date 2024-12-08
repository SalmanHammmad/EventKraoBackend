import express from 'express';
import { getNotifications, createNotification, markAsRead } from '../controllers/notificationController.js';

const router = express.Router();

router.get('/:userId', getNotifications);
router.post('/', createNotification);
router.patch('/:id/mark-as-read', markAsRead);

export default router;
