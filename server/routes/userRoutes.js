import express from "express"
import { protect } from "../middleware/authMiddleware.js";
import { getUserData, login, logout, register, storeRecentSearchedCities } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get('/', protect, getUserData);
userRouter.post('/store-recent-search', protect, storeRecentSearchedCities);
userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.post('/logout', logout);

export default userRouter;