import express from 'express';
import { 
    getCart, setCart, updateCart, deleteCart, getCarts,
    getCartOfUser, updateCartOfUserProduct, deleteCartOfUserProduct
} from '../controllers/cartController';

import { protect } from '../middleware/protectMiddleware';

const cartRouter = express.Router();

cartRouter.get('/:id', protect, getCart);
cartRouter.get('/of-user/:id', protect, getCartOfUser);

cartRouter.get('/', protect, getCarts);
cartRouter.post('/', setCart);

cartRouter.put('/:id', protect, updateCart);
cartRouter.put('/:userID/:productID', protect, updateCartOfUserProduct);

cartRouter.delete('/:id', protect, deleteCart);
cartRouter.delete('/:userID/:productID', protect, deleteCartOfUserProduct);

export default cartRouter;
