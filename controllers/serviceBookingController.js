import ServiceBooking from "../models/serviceBooking.js";
import Service from "../models/service.js";
import User from "../models/user.js";

// Book a service
export const bookService = async (req, res) => {
  const { serviceId, userId } = req.body;

  try {
    const service = await Service.findById(serviceId);
    if (!service) return res.status(404).json({ message: "Service not found" });

    // Check if user has already booked this service
    const existingServiceBooking = await ServiceBooking.findOne({ service: serviceId, user: userId });
    if (existingServiceBooking) {
      return res.status(400).json({ message: "You have already booked this service" });
    }

    // Create a new service booking
    const newServiceBooking = new ServiceBooking({
      service: serviceId,
      user: userId,
      status: "pending",
      dateBooked: new Date(),
    });

    await newServiceBooking.save();

    // Update service's booking list
    service.bookedBy.push(userId);
    await service.save();

    res.status(201).json(newServiceBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch all bookings for a service
export const getBookingsForService = async (req, res) => {
  const { serviceId } = req.params;

  try {
    const serviceBookings = await ServiceBooking.find({ service: serviceId }).populate("user");
    res.status(200).json(serviceBookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update service booking status (e.g., confirm, cancel)
export const updateServiceBookingStatus = async (req, res) => {
  const { bookingId } = req.params;
  const { status } = req.body; // Status could be "confirmed", "cancelled", etc.

  try {
    const serviceBooking = await ServiceBooking.findById(bookingId);
    if (!serviceBooking) return res.status(404).json({ message: "Service booking not found" });

    // Update status
    serviceBooking.status = status;
    await serviceBooking.save();

    res.status(200).json(serviceBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cancel a service booking
export const cancelServiceBooking = async (req, res) => {
  const { bookingId } = req.params;

  try {
    const serviceBooking = await ServiceBooking.findByIdAndDelete(bookingId);
    if (!serviceBooking) return res.status(404).json({ message: "Service booking not found" });

    // Remove user from service's booking list
    const service = await Service.findById(serviceBooking.service);
    service.bookedBy = service.bookedBy.filter((userId) => !userId.equals(serviceBooking.user));
    await service.save();

    res.status(200).json({ message: "Service booking cancelled successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
