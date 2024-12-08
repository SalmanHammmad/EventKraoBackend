import Booking from "../models/booking.js";
import Event from "../models/event.js";
import User from "../models/user.js";

// Book an event
export const bookEvent = async (req, res) => {
  const { eventId, userId } = req.body;

  try {
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // Check if user has already booked this event
    const existingBooking = await Booking.findOne({ event: eventId, user: userId });
    if (existingBooking) {
      return res.status(400).json({ message: "You have already booked this event" });
    }

    // Create a new booking
    const newBooking = new Booking({
      event: eventId,
      user: userId,
      status: "pending",
      dateBooked: new Date(),
    });

    await newBooking.save();

    // Update event's attendees list
    event.attendees.push(userId);
    await event.save();

    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch all bookings for an event
export const getBookingsForEvent = async (req, res) => {
  const { eventId } = req.params;

  try {
    const bookings = await Booking.find({ event: eventId }).populate("user");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch bookings by user
export const getBookingsByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const bookings = await Booking.find({ user: userId }).populate("event");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update booking status (e.g., confirm, cancel)
export const updateBookingStatus = async (req, res) => {
  const { bookingId } = req.params;
  const { status } = req.body; // Status could be "confirmed", "cancelled", etc.

  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    // Update status
    booking.status = status;
    await booking.save();

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cancel a booking
export const cancelBooking = async (req, res) => {
  const { bookingId } = req.params;

  try {
    const booking = await Booking.findByIdAndDelete(bookingId);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    // Remove user from event attendees list
    const event = await Event.findById(booking.event);
    event.attendees = event.attendees.filter((attendee) => !attendee.equals(booking.user));
    await event.save();

    res.status(200).json({ message: "Booking cancelled successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
