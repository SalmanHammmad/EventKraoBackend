import express from 'express';
import { getTickets, createTicket, checkInTicket } from '../controllers/ticketController.js';

const router = express.Router();

router.get('/:userId', getTickets);
router.post('/', createTicket);
router.patch('/:id/check-in', checkInTicket);

export default router;
