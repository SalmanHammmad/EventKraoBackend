import Ticket from "../models/ticket.js";

// Fetch tickets for a user
export const getTickets = async (req, res) => {
  const { userId } = req.params;
  try {
    const tickets = await Ticket.find({ user: userId }).populate("event");
    res.status(200).json(tickets);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Create a ticket
export const createTicket = async (req, res) => {
  const ticket = req.body;
  try {
    const newTicket = await Ticket.create(ticket);
    res.status(201).json(newTicket);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// Check-in a ticket
export const checkInTicket = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedTicket = await Ticket.findByIdAndUpdate(
      id,
      { isCheckedIn: true },
      { new: true }
    );
    res.status(200).json(updatedTicket);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
