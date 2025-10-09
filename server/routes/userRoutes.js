import express from "express"
import { protect } from "../middleware/authMiddleware.js";
import { getUserData, login, logout, register, storeRecentSearchedCities, changePassword } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get('/', protect, getUserData);
userRouter.post('/store-recent-search', protect, storeRecentSearchedCities);
userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.post('/logout', logout);
userRouter.put('/change-password',protect, changePassword);

export default userRouter;