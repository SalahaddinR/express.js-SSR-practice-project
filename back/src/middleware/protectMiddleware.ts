import jwt from 'jsonwebtoken';
import expressAsyncHandler from 'express-async-handler';
import UserModel from '../models/userModel';

export const protect = expressAsyncHandler(async (req, res, next) => {
    let token; 
    try {
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];

            const decode = jwt.verify(token, process.env.JWT_SECURITY_KEY);

            // @ts-ignore
            req.user = await UserModel.findById(decode.id);
            next();
        }
    }
    catch (error) { 
        res.status(400);
        throw new Error('Invalid JWT Token');
    }

    if (!token) {
        res.status(400);
        throw new Error('Token not found');
    }
})