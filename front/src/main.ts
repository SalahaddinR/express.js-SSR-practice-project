import './stylesheets/mainStyles.scss';
import 'styles/aboutusStyles.scss';
import 'styles/headerStyles.scss';  
import 'styles/catalogueStyles.scss';
import 'styles/detailProduct.scss';
import 'styles/featureStyles.scss';
import 'styles/footerStyles.scss';
import 'styles/formStyles.scss';
import 'styles/headerStyles.scss';
import 'styles/paymentStyles.scss';
import 'styles/popUpStyles.scss';
import 'styles/productStyles.scss';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

/* Connection of Loaders */
import 'loaders/loadAssets';
import 'loaders/loadSwiper';
import 'loaders/loadParams';

import { createCartPopUp, createAccountPopUp } from './generatePopUps';
import { updateCart } from './loaders/loadParams';
import {  getUserCart, createUserCart } from './requests';

import { getCurrentUser } from './requests';

document.addEventListener('DOMContentLoaded', async event => {
    const currentUser = await getCurrentUser(localStorage.getItem('authToken'));

    if (currentUser) {
        localStorage.setItem('currentUserID', currentUser._id);
        let carts = await getUserCart(localStorage.getItem('currentUserID'));
        const products = await createUserCart(carts);

        localStorage.setItem('userCart', JSON.stringify(products));

        let totalPrice = 0;
        products.forEach(
            (product: any) => {
                totalPrice += product.count * product.price
            }
        )
        
        updateCart(carts.length, totalPrice);
    } 
})

document.querySelector('.cart-element').addEventListener('click', async (event) => {
    const  currentUser = await getCurrentUser(localStorage.getItem('authToken'));

    if (!currentUser) {
        return window.location.replace('http://localhost:4000/login');
    }

    const accountPopUpExists = document.querySelector('.accountPopUp');
    const anotherPopUpExists = document.querySelector('.cartPopUp');

    if (!anotherPopUpExists) {
        const cartPopUp = await createCartPopUp(JSON.parse(localStorage.getItem('userCart')));
        if (accountPopUpExists) {
            document.body.removeChild(accountPopUpExists);
        }
        document.body.appendChild(cartPopUp);
    }
})

document.querySelector('.profile').addEventListener('click', async (event) => {
    const  currentUser = await getCurrentUser(localStorage.getItem('authToken'));

    if (!currentUser) {
        return window.location.replace('http://localhost:4000/login');
    }

    const cartPopUpExists = document.querySelector('.cartPopUp');
    const anotherPopUpExists = document.querySelector('.accountPopUp');
    if (!anotherPopUpExists) {
        const accountPopUp = createAccountPopUp();
        if (cartPopUpExists) {
            document.querySelector('body').removeChild(cartPopUpExists);
        }
        document.body.appendChild(accountPopUp);
    }
})

