import Service from "../models/service.js";

// Fetch all services
export const getServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Fetch a service by its ID
export const getService = async (req, res) => {
  const { id } = req.params;
  try {
    const service = await Service.findById(id);
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.status(200).json(service);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Create a new service
export const createService = async (req, res) => {
  const service = req.body;
  try {
    const newService = await Service.create(service);
    res.status(201).json(newService);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// Update a service by its ID
export const updateService = async (req, res) => {
  const { id } = req.params;
  const service = req.body;
  try {
    const updatedService = await Service.findByIdAndUpdate(id, service, { new: true });
    res.status(200).json(updatedService);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Delete a service by its ID
export const deleteService = async (req, res) => {
  const { id } = req.params;
  try {
    const service = await Service.findByIdAndDelete(id);
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
