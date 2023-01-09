import express from 'express';
import {
    getUser, loginUser, registerUser
} from '../controllers/userController';

import { protect } from '../middleware/protectMiddleware';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/me', protect, getUser);

export default userRouter;
