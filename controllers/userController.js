import User from "../models/user.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const createUser = async (req, res) => {
  const user = req.body;
  const newUser = new User(user);
  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.status(200).json(user);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
        }
}

export const updateUser = async (req, res) => {
    const {id} = req.params;
    const user = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(id, user, {new: true});
        res.status(200).json(updatedUser);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const deleteUser = async (req, res) => {
    
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    }catch (error) {
        res.status(404).json({ message: error.message });
    }

}

export const getEventsByUserId = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id).populate("events");
        res.status(200).json(user.events);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

