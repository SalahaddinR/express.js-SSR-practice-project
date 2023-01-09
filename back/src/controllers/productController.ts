import expressAsyncHandler from "express-async-handler";
import productModel from "../models/productModel";

interface Product { 
    price: number,
    amount: number,
    name: string,
    category: string,
    subcategory: string,
    manufacturer: string,
    originCountry: string,
    shape: string,
    color: string,
    material: string,
    vendorCode: string,
    weight: number,
    density: number,
    images: string
};

function verifyProduct(product: Product): boolean {
    const allVerifications = [
        product.price !== undefined,
        product.amount !== undefined,
        product.manufacturer !== undefined,
        product.name !== undefined,
        product.category !== undefined,
        product.subcategory !== undefined,
        product.originCountry !== undefined,
        product.shape !== undefined,
        product.material !== undefined,
        product.color !== undefined,
        product.vendorCode !== undefined,
        product.weight !== undefined,
        product.density !== undefined,
        product.images !== undefined
    ];
    return allVerifications.every(element => element === true);
};

export const getProducts = expressAsyncHandler(async (req, res) => {
    const products = await productModel.find();
    res.status(200).json(products);
})

export const getProduct = expressAsyncHandler(async (req, res) => {
    const product = await productModel.findById(req.params.id);
    res.status(200).json(product);
})

export const getProductBySubcategory = expressAsyncHandler(async (req, res) => {
    const products = await productModel.find({subcategory: decodeURI(req.params.subcategory.toLowerCase())});
    res.status(200).json(products);
})

export const setProduct = expressAsyncHandler(async (req, res) => {
    
    if (verifyProduct(req.body)) {
        const product = await productModel.create(req.body);
        res.status(200).json(product);
    }
    else {
        res.status(400).json({message: 'Invalid product data!'})
    }

})

export const updateProduct = expressAsyncHandler(async (req, res) => {
    const product = await productModel.findById(req.params.id);
    if (product) {
        const updatedProduct = await productModel.findByIdAndUpdate(req.params.id, req.body, { new: true});
        res.status(200).json(updatedProduct)
    }
    else {
        res.status(404).json({message: `product with ID-${req.params.id} not found`});
    }
})

export const deleteProduct = expressAsyncHandler(async (req, res) => {
    const product = await productModel.findById(req.params.id);
    if (product) {
        const deletedProduct = await productModel.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedProduct);
    }
    else {
        res.status(404).json({message: `product with ID-${req.params.id} not found`});
    }
})