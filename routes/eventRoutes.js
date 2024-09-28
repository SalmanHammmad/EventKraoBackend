import express from 'express';

const router = express.Router();

import {getEvents, createEvent, updateEvent, deleteEvent, getEventByEventId} from '../controllers/eventController.js';

router.get('/', getEvents);
router.post('/', createEvent);
router.patch('/:id', updateEvent);
router.delete('/:id', deleteEvent);
router.get('/:id', getEventByEventId);


export default router;


