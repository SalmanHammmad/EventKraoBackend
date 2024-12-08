import express from 'express';
const router = express.Router();

import { bookEvent, getBookingsForEvent, getBookingsByUser, updateBookingStatus, cancelBooking } from '../controllers/bookingController.js';

// Book an event
router.post('/', bookEvent);

// Fetch all bookings for an event
router.get('/event/:eventId', getBookingsForEvent);

// Fetch bookings by user
router.get('/user/:userId', getBookingsByUser);

// Update booking status (confirm or cancel)
router.patch('/:bookingId/status', updateBookingStatus);

// Cancel a booking
router.delete('/:bookingId', cancelBooking);

export default router;
