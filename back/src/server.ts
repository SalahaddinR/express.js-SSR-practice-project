import express from "express";
import consolidate from "consolidate";
import path from "path";
import { config } from "dotenv";
import colors from 'colors';

import productRouter from "./routes/productRoute";
import userRouter from "./routes/userRouter";
import cartRouter from "./routes/cartRouter";

import { errorHandler } from "./middleware/errorMiddlewares";

import connectDB from "./config/database";
import { protect } from "./middleware/protectMiddleware";

// initialize ENVIRONEMENT VARIABLES, MondoDB connection
config();
colors.enable();
connectDB();

// setting PORT from ENVIRONMENT VARIABLES
const PORT = process.env.PORT || 4000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.use(express.static(path.resolve(__dirname, '../../front/build')))
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/carts', cartRouter);

app.engine('html', consolidate.swig)
app.set('views', path.resolve(__dirname, '../../front/build'))
app.set('view engine', 'html')

app.get('/', (req, res) =>{ 
    res.render('main.html');
})

app.get('/catalog', (req, res) => {
    res.cookie('category', req.query.category ? req.query.category : 'notfound');
    res.cookie('name', req.query.name ? req.query.name: 'notfound')
    res.render('catalog.html');
})

app.get('/product', (req, res) => {
    res.cookie('id', req.query.id ? req.query.id : 'notfound');
    res.render('product.html');
})

app.get('/login', (req, res) => {
    res.render('login.html');
})

app.get('/register', (req, res) => {
    res.render('register.html');
});

app.get('/payment', (req, res) => {
    res.render('payment.html');
})

// setting middleware for handling errors
app.use(errorHandler);

const server = app.listen(PORT, () => {
    console.log(`Express server running at http://localhost:${PORT}/`.cyan.underline);
})