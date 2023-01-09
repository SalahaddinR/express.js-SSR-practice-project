import expressAsyncHandler from "express-async-handler";
import CartModel from "../models/cartModel";

export const getCart = expressAsyncHandler(async (req, res) => {
    const cart = await CartModel.findById(req.params.id);
    if (cart) {
        res.status(200).json(cart);
    }
    else {
        res.status(404).json({message: `cart with ID-${req.params.id} not found`});
    }
})

export const getCarts = expressAsyncHandler(async (req, res) => {
    const carts = await CartModel.find();
    res.status(200).json(carts);
})

export const getCartOfUser = expressAsyncHandler(async (req, res) => {
    const cart = await CartModel.find({user: req.params.id});
    if (cart) {
        res.status(200).json(cart);
    }
    else {
        res.status(404).json({message: `cart of user with ID-${req.params.id} not found`})
    }
})

export const setCart = expressAsyncHandler(async (req, res) => {
    if (req.body) {
        if (!req.body.product || !req.body.amount || !req.body.user) {
            res.status(400).json({message: 'invalid data'});
        }
        else {
            const cart = await CartModel.create(req.body);
            if (cart) {
                res.status(200).json(cart);
            }
            else {
                res.status(400).json({message: 'invalid data'});
            }
        }
    }
    else {
        res.status(400).json({message: 'invalid data'});
    }
})

export const updateCart = expressAsyncHandler(async (req, res) => {
    if (req.params && req.body) {
        const cart = await CartModel.findByIdAndUpdate(req.params.id, req.body);
        if (cart) {
            res.status(200).json(cart);
        }
        else {
            res.status(400).json({message: 'invalid data'});
        }
    }
    else {
        res.status(400).json({message: 'invalid data'});
    }
})

export const updateCartOfUserProduct = expressAsyncHandler(async (req, res) => {
    if (req.params && req.body) {
        const cart = await CartModel.findByIdAndUpdate(req.params.id, req.body);
        if (cart) {
            res.status(200).json(cart);
        }
        else {
            res.status(400).json({message: 'invalid data 1'});
        }
    }
    else {
        res.status(400).json({message: 'invalid data 2'});
    }
})

export const deleteCart = expressAsyncHandler(async (req, res) => {
    if (req.params) {
        const cart = await CartModel.findByIdAndDelete(req.params.id);
        if (cart) {
            res.status(200).json({id: cart.id})
        }
        else {
            res.status(404).json({message: `cart of user with ID-${req.params.id} not found`})
        }
    }
    else {
        res.status(404).json({message: `cart of user with ID-${req.params.id} not found`})
    }
})

export const deleteCartOfUserProduct = expressAsyncHandler(async (req, res) => {
    if (req.params) {
        const cart = await CartModel.findOneAndDelete({user: req.params.userID, product: req.params.productID});
        if (cart) {
            res.status(200).json({product: cart.product, id: cart._id});
        }
        else {
            res.status(404).json({message: `cart of user with ID-${req.params.id} not found`})
        }
    }
    else {
        res.status(404).json({message: `cart of user with ID-${req.params.id} not found`})
    }
})