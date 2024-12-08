import express from 'express';
const router = express.Router();

import { bookService, getBookingsForService, updateServiceBookingStatus, cancelServiceBooking } from '../controllers/serviceBookingController.js';

// Book a service
router.post('/', bookService);

// Fetch all bookings for a service
router.get('/service/:serviceId', getBookingsForService);

// Update service booking status (confirm or cancel)
router.patch('/:bookingId/status', updateServiceBookingStatus);

// Cancel a service booking
router.delete('/:bookingId', cancelServiceBooking);

export default router;
