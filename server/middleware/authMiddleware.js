import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    // console.log("Authorization header:", authHeader);  // see if token is reaching backend
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ success: false, message: "Not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("Decoded token:", decoded);
    // Fetch full user from DB
    const user = await User.findOne({_id:decoded.id}).select("-password"); // exclude password
    // console.log("Authenticated user:", user);
    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }
    // attach full user object (you can also fetch from DB if needed)
    req.user = user;

    next();
  } catch (err) {
    res.status(401).json({ success: false, message: "Token is not valid" });
  }
};


