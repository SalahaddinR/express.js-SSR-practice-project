import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    price: {
        type: Number,
        required: true
    },
    amount: {
        type: Number, 
        required: true
    },
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    subcategory: {
        type: String,
        required: true
    },
    manufacturer: {
        type: String,
        required: true
    },
    originCountry: {
        type: String,
        required: true
    },
    shape: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    material: {
        type: String,
        required: true
    },
    vendorCode: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    density: {
        type: Number,
        required: true
    },
    images: {
        type: Array<String>,
        required: true
    }
})

const productModel = mongoose.model('Product', productSchema);
export default productModel;