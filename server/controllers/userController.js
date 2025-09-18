import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from "uuid";
// GET /api/user/

// Get user (protected)
export const getUserData = async (req, res) => {
    res.json({
        success: true,
        user: req.user,
        role: req.user.role,
        recentSearchedCities: req.user.recentSearchedCities,
    });
};


// store user recent searched citites
export const storeRecentSearchedCities = async(req, res) => {
    try {
        const {recentSearchedCities} = req.body;
        const user = req.user;

        if(user.recentSearchedCities.length < 3){
            user.recentSearchedCities.push(recentSearchedCities);
        } else {
            user.recentSearchedCities.shift();
            user.recentSearchedCities.push(recentSearchedCities);
        }
        await user.save();
        res.json({success:true , message:"city added"});

    } catch (error) {
        res.json({success:false , message:error.message});
    }
} 

export const register = async(req, res) => {
    const {username, email, password} = req.body;
    if(!username || !email || !password) {
        return res.json({success: false, message: "Missing Details"})
    }
    try {
        const existingUser = await User.findOne({email})
        if(existingUser) {
            return res.json({success: false, message: "Username not available"})
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({_id: "user_" + uuidv4(),username, email, password: hashedPassword});
        await user.save();

        const token = jwt.sign({id : user._id}, process.env.JWT_SECRET, {expiresIn: '7d'})
        // res.cookie('token', token, {
        //     httpOnly: true,
        //     secure : process.env.NODE_ENV === "production",
        //     sameSite : process.env.NODE_ENV === "production" ? 'none' : 'strict',
        //     maxAge: 7 * 24 * 60 * 60 * 1000
        // });
        return res.json({
            success: true,
            token, // send token for frontend
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
            }
        });
    } catch (error) {
        res.json({success : false ,message : error.message})
    }
}

export const login = async (req, res) => {
    const {email , password} = req.body
    if(!email || !password) {
        return res.json({success: false , message: "Email and password required"})
    }
    try {
        const user = await User.findOne({email});
        if(!user) {
            return res.json({successs:false, message: "email not found"})
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.json({success: false, message: "Invalid email or password"})
        }

        const token = jwt.sign({id : user._id}, process.env.JWT_SECRET, {expiresIn: '7d'})
        // res.cookie('token', token, {
        //     httpOnly: true,
        //     secure : process.env.NODE_ENV === "production",
        //     sameSite : process.env.NODE_ENV === "production" ? 'none' : 'strict',
        //     maxAge: 7 * 24 * 60 * 60 * 1000
        // });

        return res.json({
            success: true,
            token, // send token for frontend
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
            }
        });

    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}

export const logout = async(req,res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure : process.env.NODE_ENV === "production",
            sameSite : process.env.NODE_ENV === "production" ? 'none' : 'strict',
        })
        return res.json({success: true, message: "Logged Out"})
    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}