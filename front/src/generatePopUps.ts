import { updateCart } from './loaders/loadParams';
import { getCurrentUser, getProduct, removeFromCart, updateProduct } from './requests';

export interface cartElement {
    id: string ,
    count: number,
    title: string,
    price: number,
    imageSrc: string,
    cartID: string
}

export const properPhrase = (counter: number): string => {
    if (counter === 1) return 'товар';
    else if (counter > 1 && counter < 5) return 'товара';
    else if (counter >= 5 || counter === 0) return 'товаров';
};

export function createCartProductItem(cartElement: cartElement): HTMLElement {
    const {id, count, title, imageSrc, cartID} = cartElement;

    const cartProduct = document.createElement('div');
    cartProduct.setAttribute('class', 'cartProduct');

    const productAmount = document.createElement('span');
    productAmount.innerText  = `${count} x`;

    const productTitle = document.createElement('span');
    productTitle.innerText = title;

    cartProduct.appendChild(productAmount);

    const image = require(`assets/products/${imageSrc}`);
    const productImage = document.createElement('img');
    productImage.setAttribute('class', 'productImageCart')
    productImage.setAttribute('src', image);
    cartProduct.appendChild(productImage);

    cartProduct.appendChild(productTitle);

    const productDeleteBtn = document.createElement('button');
    productDeleteBtn.setAttribute('class','cartDeleteBtn');
    productDeleteBtn.classList.add('material-symbols-outlined')
    productDeleteBtn.innerText = 'close';
    productDeleteBtn.setAttribute('product-id', id);
    productDeleteBtn.setAttribute('cart-id', cartID);
    productDeleteBtn.addEventListener('click', async event => {
        // @ts-ignore
        const deletedItem = await removeFromCart(event.target.getAttribute('product-id'), localStorage.getItem('currentUserID'));
        let products = Array.from(JSON.parse(localStorage.getItem('userCart')));
        // @ts-ignore
        products = products.filter(product => product.cartID !== deletedItem.id);
    
        localStorage.setItem('userCart', JSON.stringify(products));
        updateCart(
            parseInt(document.querySelector('.count').innerHTML) - 1,
            parseInt(document.querySelector('.totalPrice').innerHTML) - cartElement.price * cartElement.count
        );
        
        document.querySelector('.totalPriceValue').innerHTML = 
            (parseInt(document.querySelector('.totalPriceValue').innerHTML) - cartElement.price).toString() + ' ₽';

        const product = await getProduct(id);
        const updatedProduct = await updateProduct(id, {
            amount: product.amount + count
        });
       
        document.body.removeChild(document.querySelector('.cartPopUp'));
        document.body.appendChild(
            await createCartPopUp(JSON.parse(localStorage.getItem('userCart')))
        )
    })
    cartProduct.appendChild(productDeleteBtn);

    return cartProduct;
}


export async function createCartPopUp(cartElements: Array<cartElement>): Promise<HTMLElement> {
    const cartPopUp = document.createElement('div');
    cartPopUp.setAttribute('class', 'cartPopUp');

    const cartPopUpHeader = document.createElement('div');
    cartPopUpHeader.setAttribute('class', 'cartPopUpHeader');

    const headerElement = document.createElement('h2');
    headerElement.innerText = 'Koрзина';

    const headerDescription = document.createElement('span');
    headerDescription.setAttribute('class', 'description');
    headerDescription.innerText = `${cartElements.length} ${properPhrase(cartElements.length)}`

    const headerRedirectBtn = document.createElement('a');
    const currentUser = await getCurrentUser(localStorage.getItem('authToken'));
    if (currentUser) {
        headerRedirectBtn.setAttribute('href', '/payment');
    }
    else {
        headerRedirectBtn.setAttribute('href', '/login');
    }
    headerRedirectBtn.setAttribute('class', 'headerRedirectBtn');
    headerRedirectBtn.innerText = 'Посмотреть корзину';

    cartPopUpHeader.appendChild(headerElement);
    cartPopUpHeader.appendChild(headerDescription);
    cartPopUpHeader.appendChild(headerRedirectBtn);

    const cartPopUpProducts = document.createElement('div');
    cartPopUpProducts.setAttribute('class', 'cartPopUpProducts');

    
    if (cartElements.length <= 2) {
        cartElements.forEach(
            cartElement => {
                const cartProduct = createCartProductItem(cartElement);
                cartPopUpProducts.appendChild(cartProduct);
            }
        )
    }
    else {
        for (let elementIndex = 0; elementIndex < 2; elementIndex++) {
            const cartProduct = createCartProductItem(cartElements[elementIndex]);
            cartPopUpProducts.appendChild(cartProduct);
        }

        const moreItemsIndicator = document.createElement('span');
        moreItemsIndicator.setAttribute('class', 'moreProducts');
        moreItemsIndicator.innerText = `+ Ещё ${cartElements.length - 2} ${properPhrase(cartElements.length - 2)}`;

        cartPopUpProducts.appendChild(moreItemsIndicator);        
    }

    const cartPopUpTotalPrice = document.createElement('div');
    cartPopUpTotalPrice.setAttribute('class', 'totalPrice');

    const totalPriceLabel = document.createElement('span');
    totalPriceLabel.setAttribute('class', 'totalPriceLabel');
    totalPriceLabel.innerText = 'Итого'

    const totalPriceValue = document.createElement('span');
    totalPriceValue.setAttribute('class', 'totalPriceValue');
    totalPriceValue.addEventListener('onchange', event => {
        console.log('changed')
    })

    const calculateTotalPrice = (): number => {
        let price = 0;
        for (let element of cartElements) {
            price += element.count * element.price
        }
        return price;
    }

    totalPriceValue.innerText = `${calculateTotalPrice()} ₽`

    cartPopUpTotalPrice.appendChild(totalPriceLabel);
    cartPopUpTotalPrice.appendChild(totalPriceValue);

    const cartPopUpPurchaseBtn = document.createElement('button');
    cartPopUpPurchaseBtn.setAttribute('class', 'purchaseBtn');
    cartPopUpPurchaseBtn.innerText = 'Перейти к оформлению'

    cartPopUp.appendChild(cartPopUpHeader);
    cartPopUp.appendChild(cartPopUpProducts);
    cartPopUp.appendChild(cartPopUpTotalPrice);
    cartPopUp.appendChild(cartPopUpPurchaseBtn);

    const cartPopUpClose = document.createElement('button');
    cartPopUpClose.setAttribute('class', 'cartPopUpClose');
    cartPopUpClose.innerText = 'Закрыть';
    cartPopUpClose.addEventListener('click', event=> {
        const cartPopUp = document.querySelector('.cartPopUp');
        if (cartPopUp) {
            document.querySelector('body').removeChild(cartPopUp);
        }
    })

    cartPopUp.appendChild(cartPopUpClose);

    return cartPopUp;
} 

export function createAccountPopUp(): HTMLElement {
    const accountPopUp = document.createElement('div');
    accountPopUp.setAttribute('class', 'accountPopUp');

    const accountItem01 = document.createElement('a');
    accountItem01.setAttribute('class', 'accountItem');
    accountItem01.innerText  = 'Мой Аккаунт'

    const accountItem02 = document.createElement('a');
    accountItem02.setAttribute('class', 'accountItem'); 
    accountItem02.innerText = 'Мой Список';

    const accountItem03 = document.createElement('a');
    accountItem03.setAttribute('class', 'accountItem');
    accountItem03.innerText = 'Заказы';

    const accountItem04 = document.createElement('button');
    accountItem04.setAttribute('class', 'accountItem');
    accountItem04.innerText = 'Выход';
    accountItem04.addEventListener('click', event => {
        localStorage.removeItem('authToken');
        document.body.removeChild(accountPopUp);
        updateCart(0, 0);
    })

    accountPopUp.appendChild(accountItem01);
    accountPopUp.appendChild(accountItem02);
    accountPopUp.appendChild(accountItem03);
    accountPopUp.appendChild(accountItem04);

    const accountPopUpCloseBtn = document.createElement('button');
    accountPopUpCloseBtn.setAttribute('class', 'accountPopUpClose');
    accountPopUpCloseBtn.innerText = 'Закрыть';
    accountPopUpCloseBtn.addEventListener('click', event => {
        const accountPopUp = document.querySelector('.accountPopUp');
        if (accountPopUp) {
            document.body.removeChild(accountPopUp);
        }
    })

    accountPopUp.appendChild(accountPopUpCloseBtn);

    return accountPopUp;
}