import User from "../models/user.js";

const isAdmin = async (req, res, next) => {
    console.log("admin ")
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        res.status(401);
        throw new Error("Not Authorized as an Admin");
    }
    };

export default isAdmin;