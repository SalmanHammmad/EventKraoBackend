import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if all fields are filled
    if(!email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    // Check if user exists
    const userExists = await User.findOne({ email });
    
    // Check if password is correct
    const passwordCheck = await bcrypt.compare(password, userExists.password);

    // If user exists and password is correct, create a token for the user
    if(userExists && passwordCheck) {
      const token = jwt.sign({ id: userExists._id }, process.env.JWT_SECRET, { expiresIn: '2d' });
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 2 * 24 * 60 * 60 * 1000 // 2 days
    });

      res.status(200).json({
          _id: userExists._id,
          name: userExists.name,
          email: userExists.email,
      });
  } else {
      return res.status(400).json({ message: 'Invalid email or password' });
  }

  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {

    // Check if all fields are filled
    if(!name || !email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if(existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = await User.create({ name, email, password: passwordHash });

    if(newUser) {
      // Create a token for the user
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '2d' });
      // Send the token in a HTTP-only cookie(most secure way to store token)
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 2 * 24 * 60 * 60 * 1000 // 2 days
    });

      res.status(201).json({
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
      });
  } else {
      res.status(400);
      throw new Error('Invalid user data');
  }


  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const logout = async (req, res) => {
  try {
    // Clear the cookie
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}



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
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
    }
    catch (error) {
        res.status(404).json({ message: error.message, ok: false });
    }
}

export const updateUser = async (req, res) => {
    const {id} = req.params;
    const user = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(id, user, {new: true});
        
        res.status(200).json({updatedUser, ok: true});
    }
    catch (error) {
        res.status(404).json({ message: error.message ,ok: false});
    }
}

export const deleteUser = async (req, res) => {
    
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully", ok: true });
    }catch (error) {
        res.status(404).json({ message: error.message, ok: false });
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

