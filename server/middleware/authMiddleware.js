import { getAuth } from "@clerk/express";
import User from "../models/User.js";

export const protect = async (req,res,next) => {
    const {userId} = getAuth(req);
    // console.log(userId);
    
    if(!userId){
        res.json({success: false, message:"not authenticated"})
    }
    else
    {
        const user = await User.findById(userId);
        // console.log(user);
        req.user = user;
        next();
    }
}

