import expressAsyncHandler from "express-async-handler";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import UserModel from "../models/userModel";

const generateToken = (id: any) => {
    return jwt.sign({id}, process.env.JWT_SECURITY_KEY, {
        expiresIn: '1d'
    })
} 

export const registerUser = expressAsyncHandler(async (req, res) => {
    const {firstname, lastname, email, password} = req.body;

    if (![firstname, lastname, email, password].every(element => element !== undefined)) {
        res.status(400).json({message: 'All Fields required'});
    }
    else {
        const user = await UserModel.findOne({email});
        if (user) {
            res.status(400).json({message: 'User already exists'});
        }
        else {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const createdUser = await UserModel.create({
                firstname,
                lastname,
                email,
                password: hashedPassword
            });

            if (createdUser) {
                res.status(200).json({
                    id: createdUser._id,
                    email: createdUser.email,
                    token: generateToken(createdUser._id)
                })
            }
            else {
                res.status(400).json({message: 'Invalid user data'});
            }
        }
    }
})

export const loginUser = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({message: 'All Fields required'});
    }
    else {
        const user = await UserModel.findOne({email});
        if (!user) {
            res.status(400).json({message: 'User not found'});
        }
        else {
            if (await bcrypt.compare(password, user.password)) {
                res.status(200).json({
                    id: user._id,
                    email: user.email,
                    token: generateToken(user._id)
                })
            }
            else {
                res.status(401).json({message: 'Invalid credentials'});
            }
        }
    }
})

export const getUser = expressAsyncHandler(async (req, res) => {
    // @ts-ignore
    const user = await UserModel.findById(req.user._id);
    if (user) {
        res.status(200).json(user);
    }
    else {
        res.status(400).json({message: 'User does no exist'});
    }
})