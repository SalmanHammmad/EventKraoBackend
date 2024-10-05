import jwt from "jsonwebtoken";
import User from "../models/user.js";

const protect = async (req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    try {
      const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decodeToken.userId).select("-password"); // exclude password
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not Authorized, Token Failed");
    }
  } else {
    return res.status(401).json({ message: "Not Authorized, No Token" });
  }
};

export default protect;
