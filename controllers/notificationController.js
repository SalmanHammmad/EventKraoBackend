import Notification from "../models/notification.js";

// Fetch notifications for a user
export const getNotifications = async (req, res) => {
  const { userId } = req.params;
  try {
    const notifications = await Notification.find({ user: userId });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Create a notification
export const createNotification = async (req, res) => {
  const notification = req.body;
  try {
    const newNotification = await Notification.create(notification);
    res.status(201).json(newNotification);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// Mark a notification as read
export const markAsRead = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedNotification = await Notification.findByIdAndUpdate(
      id,
      { isRead: true },
      { new: true }
    );
    res.status(200).json(updatedNotification);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
