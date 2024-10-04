import Event from "../models/event.js";

// Fetch all events
import mongoose from 'mongoose';

export const getEvents = async (req, res) => {
  const { search } = req.query; // Capture search query from the request

  try {
    let events;

    if (search) {
      // Check if search query is a valid MongoDB ObjectId
      if (mongoose.Types.ObjectId.isValid(search)) {
        // If it's a valid ObjectId, search by ID
        events = await Event.find({ _id: search });
      } else {
        // Otherwise, treat it as a text search (e.g., for the title)
        const searchRegex = new RegExp(search, 'i'); // 'i' for case-insensitive
        events = await Event.find({ title: searchRegex });
      }
    } else {
      // If no search query, return all events
      events = await Event.find();
    }

    res.status(200).json(events);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};



// Create a new event
export const createEvent = async (req, res) => {
  const event = req.body;
  const newEvent = new Event(event);
  try {
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};


// Fetch an event by its ID
export const getEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Event.findById(id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.status(200).json(event);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};



// Update an event by its ID
export const updateEvent = async (req, res) => {
  const { id } = req.params;
  const event = req.body;
  try {
    const existingEvent = await Event.findById(id);
    if (!existingEvent) return res.status(404).json({ message: "Event not found" });

    const updatedEvent = await Event.findByIdAndUpdate(id, event, { new: true });
    res.status(200).json({updatedEvent, ok: true});
  } catch (error) {
    res.status(404).json({ message: error.message, ok: false });
  }
};

// Delete an event by its ID
export const deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Event.findByIdAndDelete(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Fetch events by user ID (this assumes each event has a `userId` field)
export const getEventsByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const events = await Event.find({ userId });
    res.status(200).json(events);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Fetch event by event ID (same as getEvent, potentially redundant)
export const getEventByEventId = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Event.findById(id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.status(200).json(event);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
