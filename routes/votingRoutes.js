import express from 'express';
import { getVotesForEvent, castVote } from '../controllers/votingController.js';

const router = express.Router();

router.get('/:eventId', getVotesForEvent);
router.post('/', castVote);

export default router;
