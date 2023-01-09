import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});


const FavoriteModel = mongoose.model('Favorite', favoriteSchema);
export default FavoriteModel;