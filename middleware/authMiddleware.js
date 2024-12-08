import jwt from "jsonwebtoken";
import User from "../models/user.js";

const protect = async (req, res, next) => {
  console.log("Token check");
  const { token } = req.cookies;
  if (token) {
    try {
      const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decodeToken.id).select("-password"); // exclude password
      if (!req.user) {
        res.status(401);
        throw new Error("Not Authorized, User Not Found");
      }
      next();
    } catch (error) {
      console.error("Error during token verification or user fetching:", error);
      res.status(401);
      throw new Error("Not Authorized, Token Failed");
    }
  } else {
    return res.status(401).json({ message: "Not Authorized, No Token" });
  }
};

export default protect;