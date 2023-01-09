import express from 'express';
import { 
    getProducts, getProduct, setProduct, 
    updateProduct, deleteProduct, getProductBySubcategory
} from '../controllers/productController';

const productRouter = express.Router();

productRouter.route('/').get(getProducts).post(setProduct);
productRouter.route('/:id').get(getProduct).put(updateProduct).delete(deleteProduct);

productRouter.route('/subcat/:subcategory').get(getProductBySubcategory);

export default productRouter;
