import { descriptionData } from "./mockData";
import { getCurrentUser, addToCart, getProduct, removeFromCart, updateProduct, updateUserCart } from "./requests";
import { cartElement, properPhrase } from "./generatePopUps";
import { updateCart } from "./loaders/loadParams";


interface catalogueItem {
    id: number,
    name: string
};

interface catalogueData {
    id: number,
    title: string,
    items: Array<catalogueItem>,
    icon: string
};

export function createCatalogueItem(category: string, catalogueItemData: catalogueItem): HTMLElement {
    const catalogueItemElement = document.createElement('a');
    catalogueItemElement.setAttribute('class', 'catalogueItem');
    catalogueItemElement.setAttribute('href', `/catalog?category=${category}&name=${catalogueItemData.name}`)
    catalogueItemElement.innerText = catalogueItemData.name;
    return catalogueItemElement;
}

export function createCatalogue(catalogueData: catalogueData): HTMLElement {
    const catalogueElement = document.createElement('div');
    catalogueElement.setAttribute('class', 'catalogueSection');

    const catalogueHeader = document.createElement('div');
    catalogueHeader.setAttribute('class', 'catalogueHeader');

    const catalogueHeaderIcon = document.createElement('img');
    catalogueHeaderIcon.setAttribute('src', require(`assets/icons/${catalogueData.icon}`))
    catalogueHeaderIcon.style.cssText = 'width: 30px; height: 30px';

    const catalogueHeaderName = document.createElement('span');
    catalogueHeaderName.setAttribute('class', 'catalogueName');
    catalogueHeaderName.innerText = catalogueData.title;

    catalogueHeader.appendChild(catalogueHeaderIcon);
    catalogueHeader.appendChild(catalogueHeaderName);

    const catalogueItems = document.createElement('div');
    catalogueItems.setAttribute('class', 'catalogueItems');

    catalogueData.items.forEach(
        item => {
            const itemElement = createCatalogueItem(catalogueData.title, item);
            catalogueItems.appendChild(itemElement)
        }
    )

    catalogueElement.appendChild(catalogueHeader);
    catalogueElement.appendChild(catalogueItems);
    return catalogueElement;
}

export function createNavigation(catalog: catalogueData): HTMLElement {
    const navigation = document.createElement('div');
    navigation.setAttribute('class', 'sideNavigation');
    navigation.innerHTML = `
        <a href="/" class="navToMain">
            <span class="material-symbols-outlined">keyboard_arrow_left</span>${catalog.title}
        </a>
    `

    const navigationContent = document.createElement('nav');
    navigationContent.setAttribute('class', 'navigationContent');

    catalog.items.forEach(
        item => {
            const navItem = createCatalogueItem(catalog.title, item);
            navigationContent.appendChild(navItem);
        }
    )

    navigation.appendChild(navigationContent);
    return navigation;
}

export interface Product {
    _id: string,
    price: number,
    amount: number,
    name: string,
    category: string,
    manufacturer: string,
    originCountry: string,
    shape: string,
    color: string,
    material: string,
    vendorCode: string,
    weight: number,
    density: number,
    images: Array<string>
};

export async function createProductMedium(product: Product): Promise<HTMLElement> {
    const productElement = document.createElement('div');
    productElement.setAttribute('class', 'product');

    const amountStatus = (amount: number): Array<string> => {
        if (amount > 4) {
            return ['в наличии', 'green'];
        }
        else if (amount < 4 && amount > 0) {
            return ['осталось мало', 'yellow'];
        }
        return ['нет в наличии', 'red'];
    }

    productElement.innerHTML = `
        <span class="productAmount" style="color: ${amountStatus(product.amount)[1]}">${amountStatus(product.amount)[0]}</span>
        <img src=${require(`assets/products/${product.images[0]}`)} class="productImage"/>
        <span class="productName">${product.name}</span>
        <span class="productVendorCode"><span>Артикул:</span> ${product.vendorCode}</span>
        <span class="productPrice">${product.price}₽</span>
    `

    const productBtnsGroup = document.createElement('div');
    productBtnsGroup.setAttribute('class', 'productBtns');

    const productDetailBtn = document.createElement('a');
    productDetailBtn.setAttribute('class', 'productDetailBtn');
    productDetailBtn.setAttribute('href', `/product?id=${product._id}`);
    productDetailBtn.innerText = 'Подробнее'

    productBtnsGroup.appendChild(productDetailBtn);

    const user = await getCurrentUser(localStorage.getItem('authToken'));

    if (user) {
        const productCartBtn = document.createElement('button');
        productCartBtn.setAttribute('class', 'productCartBtn');
        productCartBtn.classList.add('material-symbols-outlined');
        productCartBtn.innerText = 'shopping_cart';
        productBtnsGroup.appendChild(productCartBtn);

        productCartBtn.addEventListener('click', async event => {

            if (product.amount > 0) {
                const addedItem = await addToCart(localStorage.getItem('currentUserID'), product._id, 1);
                if (addedItem) {
                    updateCart(
                        parseInt(document.querySelector('.count').innerHTML) + 1,
                        parseInt(document.querySelector('.totalPrice').innerHTML) + product.price
                    );
                }
            }

        })
    }
    else {
        const productCartBtn = document.createElement('a');
        productCartBtn.setAttribute('class', 'productCartBtn');
        productCartBtn.setAttribute('href', '/login');
        productCartBtn.classList.add('material-symbols-outlined');
        productCartBtn.innerText = 'shopping_cart';
        productBtnsGroup.appendChild(productCartBtn);
    }

    productElement.appendChild(productBtnsGroup);
    return productElement;
}

export async function createProductLarge(product: Product) {
    const productElement = document.createElement('div');
    productElement.setAttribute('class', 'productLarge');

    const productHeader = document.createElement('h1');
    productHeader.setAttribute('class', 'productLargeHeader');
    productHeader.innerText = product.name;

    const productFeatures = document.createElement('div');
    productFeatures.setAttribute('class', 'productLargeFeatures');
    productFeatures.innerHTML = `
        <span class="productLargeFeature">
            <span class="tag">Артикул Товара</span>
            <span>${product.vendorCode}</span>
        </span>
        <span class="productLargeFeature">
            <span class="tag">Страна производства</span>
            <span>${product.originCountry}</span>
        </span>
        <span class="productLargeFeature">
            <span class="tag">Производитель</span>
            <span>${product.manufacturer}</span>
        </span>
        <span class="productLargeFeature">
            <span class="tag">Материал</span>
            <span>${product.material}</span>
        </span>
        <span class="productLargeFeature">
            <span class="tag">Форма</span>
            <span>${product.shape}</span>
        </span>
        <span class="productLargeFeature">
            <span class="tag">Вес (кг)</span>
            <span>${product.weight}</span>
        </span>
        <span class="productLargeFeature">
            <span class="tag">Плотность (кг/куб м)</span>
            <span>${product.density}</span>
        </span>
        <span class="productLargeFeature">
            <span class="tag">Цвет</span>
            <span>${product.color}</span>
        </span>
    `

    const productPurchaseContainer = document.createElement('div');
    productPurchaseContainer.setAttribute('class', 'productPurchaseContainer');

    productPurchaseContainer.innerHTML = `
        <div class="productRegularPurchaseContainer">
            <div class="upperContainer">
                <div class="amountContainer">
                    <span class="label">Количество шт.</span>
                    <div class="controller">
                        <button class="decreaseAmountProduct${product._id} controlBtn">-</button>
                        <span class="amountController${product._id} amountDisplayer">0</span>
                        <button class="increaseAmountProduct${product._id} controlBtn">+</button>
                    </div>
                </div>

                <div class="priceContainer">
                    <span>Цена за шт.</span>
                    <span class="price">${product.price}₽</span>
                </div>
            </div>

        </div>
    `
    const buttonsContainer = document.createElement('div');
    buttonsContainer.setAttribute('class', 'lowerContainer');

    const currentUser = await getCurrentUser(localStorage.getItem('authToken'));

    if (currentUser) {
        const addToCartBtn = document.createElement('button');
        addToCartBtn.setAttribute('class', 'addToCartBtn');
        addToCartBtn.innerHTML = `
            <span class="material-symbols-outlined">shopping_cart</span>
            В корзинку
        `
        addToCartBtn.addEventListener('click', async (event) => {
            const amount = parseInt(document.querySelector(`.amountController${product._id}`).innerHTML);
            if (amount > 0) {
                const addedItem = await addToCart(currentUser._id, product._id, amount);

                if (addedItem) {
                    updateCart(
                        parseInt(document.querySelector('.count').innerHTML) + 1,
                        parseInt(document.querySelector('.totalPrice').innerHTML)  + addedItem.price * addedItem.count
                    )
                }
            }
        });
        buttonsContainer.appendChild(addToCartBtn)

        const addToFavorite = document.createElement('button');
        addToFavorite.setAttribute('class', 'addToFavoriteBtn');
        addToFavorite.innerHTML = `
            <span class="material-symbols-outlined">favorite</span>
            <span>В избранное</span>
        `;
        
        addToFavorite.addEventListener('click', async (event) => {

        });
        buttonsContainer.appendChild(addToFavorite);
    }
    else {
        const addToCartBtn = document.createElement('a');
        addToCartBtn.setAttribute('href', '/login');
        addToCartBtn.setAttribute('class', 'addToCartBtn');
        addToCartBtn.innerHTML = `
            <span class="material-symbols-outlined">shopping_cart</span>
            В корзинку
        `
        buttonsContainer.appendChild(addToCartBtn)

        const addToFavorite = document.createElement('a');
        addToFavorite.setAttribute('href', '/login')
        addToFavorite.setAttribute('class', 'addToFavoriteBtn');
        addToFavorite.innerHTML = `
            <span class="material-symbols-outlined">favorite</span>
            <span>В избранное</span>
        `;
        
        buttonsContainer.appendChild(addToFavorite);
    }

    
    productPurchaseContainer.querySelector('.productRegularPurchaseContainer').insertAdjacentElement('beforeend', buttonsContainer);
    localStorage.setItem(`productAmount${product._id}`, '0');

    const productQuickPurchase = document.createElement('div');
    productQuickPurchase.setAttribute('class', 'productQuickPurchaseContainer');
    productQuickPurchase.innerHTML = `
        <h2 class="title">Быстрое оформление</h2>
        <span class="text">Оставьте телефон, оператор перезвонит в течении 5 минут и уточнит детали.</span>
        <div class="form-group">
            <input type="text" class="textfield" name="phoneNumber" id="phoneNumberQuickPurchase" placeholder="Номер телефона"/>
            <button class="purchaseQuickBtn">Купить в один клик</button>
        </div>
    `

    productPurchaseContainer.appendChild(productQuickPurchase);

    const productImageContainer = document.createElement('div');
    productImageContainer.setAttribute('class', 'productImageContainer');

    const productImage = document.createElement('img');
    productImage.setAttribute('class', 'productImage');
    productImage.setAttribute('src', require(`assets/products/${product.images[0]}`))

    const productImages = document.createElement('div');
    productImages.setAttribute('class', 'productImages');

    product.images.forEach(
        productImageElement => {
            const element = document.createElement('img');
            element.setAttribute('class', 'viewImage');
            element.setAttribute('src', require(`assets/products/${productImageElement}`));
            element.addEventListener('click', event => {
                Array.from(document.querySelectorAll('.viewImage')).forEach(
                    viewImageElement => {
                        // @ts-ignore
                        viewImageElement.style.cssText = 'box-shadow: none';
                    }
                )
                productImage.setAttribute('src', element.getAttribute('src'));
                // @ts-ignore
                event.target.style.cssText = 'box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);'
            })

            productImages.appendChild(element);
        }
    )

    const defaultProductDescription = document.createElement('div');
    defaultProductDescription.setAttribute('class', 'productDescription');

    const descriptionContent = document.createElement('p');
    descriptionContent.setAttribute('class', 'productDescriptionData');
    descriptionContent.innerText = descriptionData['Описание'];

    const descriptionNavig = document.createElement('nav');
    descriptionNavig.setAttribute('class', 'descriptionNavig');
    ['Описание', 'Документация', 'Сертификаты'].forEach(
        element => {
            const navigItem = document.createElement('button');
            navigItem.setAttribute('class', 'descriptionNavigItem');
            navigItem.innerText = element;

            navigItem.addEventListener('click', event => {
                // @ts-ignore
                descriptionContent.innerText = descriptionData[element];
                Array.from(document.querySelectorAll('.descriptionNavigItem')).forEach(
                    element => {
                        // @ts-ignore
                        element.style.cssText = 'border-bottom: none';
                    }
                )

                // @ts-ignore
                event.target.style.cssText = 'border-bottom: 2px solid #EB4037';
            })

            descriptionNavig.appendChild(navigItem);
        }
    )

    defaultProductDescription.appendChild(descriptionNavig);
    defaultProductDescription.appendChild(descriptionContent);

    productImageContainer.appendChild(productImage);
    productImageContainer.appendChild(productImages);

    productElement.appendChild(productHeader);

    const productMiddleContainer = document.createElement('div');
    productMiddleContainer.setAttribute('class', 'productMiddleContainer');

    productMiddleContainer.appendChild(productImageContainer);
    productMiddleContainer.appendChild(productFeatures);
    productMiddleContainer.appendChild(productPurchaseContainer);

    productElement.appendChild(productMiddleContainer);
    productElement.appendChild(defaultProductDescription);
    return productElement;
}

export function createPaymentItem(element: cartElement): HTMLElement {
    const paymentItem = document.createElement('div');
    paymentItem.setAttribute('class', 'paymentItem');

    const productName = document.createElement('span');
    productName.setAttribute('class', 'productName');
    productName.innerText = element.title;

    const saveItem = document.createElement('span');
    saveItem.setAttribute('class', 'icon');
    saveItem.classList.add('material-symbols-outlined');
    saveItem.innerText = 'done';
    saveItem.addEventListener('click', async event => {
        const newAmount = parseInt(countDisplayer.innerText);
        if (element.count !== newAmount) {
            const updatedCart = await updateUserCart(element.cartID, newAmount);
            if (updatedCart) {
                let products = Array.from(JSON.parse(localStorage.getItem('userCart')));
                for (let index = 0; index < products.length; index++) {
                    // @ts-ignore
                    if (products[index].cartID == updatedCart._id && products[index].product == updatedCart.product) {
                        // @ts-ignore
                        products[index].count = newAmount;
                    }
                }
                localStorage.setItem('userCart', JSON.stringify(products));

                let totalPrice = parseInt(document.querySelector('.totalPrice').innerHTML) 

                updateCart(
                    parseInt(document.querySelector('.count').innerHTML),
                    (totalPrice - element.price * element.count) + (element.price * newAmount)
                );

                priceValue.innerText = (element.price * newAmount).toString();

                document.querySelector('.billTotal').querySelector('.price').innerHTML = 
                    ((totalPrice - element.price * element.count) + element.price * parseInt(countDisplayer.innerText)).toString() + ' ₽'

                document.getElementById('productSum').innerText = 
                    ((totalPrice - element.price * element.count) + element.price * parseInt(countDisplayer.innerText) - 250).toString() + ' ₽'
            }
        }
    })

    const deleteItem = document.createElement('span');
    deleteItem.setAttribute('class', 'icon');
    deleteItem.classList.add('material-symbols-outlined');
    deleteItem.innerText = 'delete';
    deleteItem.addEventListener('click', async event => {
        const currentUser = await getCurrentUser(localStorage.getItem('authToken'));
        const deletedItem = await removeFromCart(element.id, currentUser._id);
        
        let products = Array.from(JSON.parse(localStorage.getItem('userCart')));
        products = products.filter(
            product => {
                // @ts-ignore
                return product.cartID != deletedItem.id;
            }
        )

        const product = await getProduct(element.id);
        const updatedProduct = await updateProduct(
            product._id, {
                amount: product.amount + element.count
            }
        );

        updateCart(
            parseInt(document.querySelector('.count').innerHTML) - 1,
            parseInt(document.querySelector('.totalPrice').innerHTML) - element.count * element.price
        )   

        localStorage.setItem('userCart', JSON.stringify(products));
        document.querySelector('.rightContent').removeChild(
            document.querySelector('.paymentBillContent')
        )

        document.querySelector('.rightContent').appendChild(createPaymentBill());
    })

    const buttonsGroup = document.createElement('div');
    buttonsGroup.setAttribute('class', 'buttonsGroup');
    buttonsGroup.appendChild(saveItem);
    buttonsGroup.appendChild(deleteItem);

    const upperPannel = document.createElement('div');
    upperPannel.setAttribute('class', 'productUpperPannel');
    upperPannel.appendChild(productName);
    upperPannel.appendChild(buttonsGroup);
    
    const productPrice = document.createElement('div');
    productPrice.setAttribute('class', 'productPrice');
    const priceLabel = document.createElement('span');
    priceLabel.setAttribute('class', 'priceLabel');
    priceLabel.innerText = 'Цена';

    const priceValue = document.createElement('span');
    priceValue.setAttribute('class', 'priceValue');
    priceValue.innerText = (element.price * element.count).toString() + ' ₽';

    productPrice.appendChild(priceLabel);
    productPrice.appendChild(priceValue);

    const productCount = document.createElement('div');
    productCount.setAttribute('class', 'productCount');

    const countDisplayer = document.createElement('span');
    countDisplayer.setAttribute('class', 'count');
    countDisplayer.innerText = element.count.toString();

    const increaseBtn = document.createElement('span');
    increaseBtn.setAttribute('class', 'controlBtn');
    increaseBtn.innerText = '+';
    increaseBtn.addEventListener('click', async event => {
        const product = await getProduct(element.id);
        if (parseInt(countDisplayer.innerHTML) < product.amount) {
            countDisplayer.innerText = (parseInt(countDisplayer.innerText) + 1).toString();
        }
    })

    const decreaseBtn = document.createElement('span');
    decreaseBtn.setAttribute('class', 'controlBtn');
    decreaseBtn.innerText = '-';
    decreaseBtn.addEventListener('click', async event => {
        if (parseInt(countDisplayer.innerText) > 1) {
            countDisplayer.innerText = (parseInt(countDisplayer.innerText) - 1).toString();
        }
    })

    productCount.appendChild(decreaseBtn);
    productCount.appendChild(countDisplayer);
    productCount.appendChild(increaseBtn);

    const lowerPannel = document.createElement('div');
    lowerPannel.setAttribute('class', 'productLowerPannel');
    lowerPannel.appendChild(productPrice);
    lowerPannel.appendChild(productCount);

    paymentItem.appendChild(upperPannel);
    paymentItem.appendChild(lowerPannel);

    return paymentItem;
}

export function createPaymentBill() {
    const paymentBillContent = document.createElement('div');
    paymentBillContent.setAttribute('class', 'paymentBillContent');

    const billHeader = document.createElement('h2');
    billHeader.setAttribute('class','productBillHeader');
    billHeader.innerText = 'Состав заказа: ';

    const carts = document.createElement('div');
    carts.setAttribute('class', 'carts');

    const cartElements = Array.from(JSON.parse(localStorage.getItem('userCart')));
    let  totalPrice = 0;
    
    cartElements.forEach(
        element => {
            // @ts-ignore
            const elementProduct = createPaymentItem(element);
            carts.appendChild(elementProduct);
            // @ts-ignore
            totalPrice += element.price * element.count;
        }
    )

    const billDetail = document.createElement('div');
    billDetail.setAttribute('class', 'billDetail');
    billDetail.innerHTML = `
        <div class="billRow">
            <span class="title" id="special">Ваш заказ</span>
            <span class="amount">${cartElements.length} ${properPhrase(cartElements.length)}</span>
        </div>
        <div class="billRow">
            <span class="title">Товары</span>
            <span class="sum" id="productSum">${totalPrice} ₽</span>
        </div>
        <div class="billRow">
            <span class="title">Доставка</span>
            <span class="sum">250 ₽</span>
        </div>
    `

    const billTotal = document.createElement('div');
    billTotal.setAttribute('class', 'billTotal');
    billTotal.innerHTML = `
            <span class="title">Итого</span>
            <span class="price">${totalPrice + 250} ₽</span>
    `

    const purchaseBtn = document.createElement('button');
    purchaseBtn.setAttribute('class', 'purchaseBtn');
    purchaseBtn.innerText = 'Оплатить';

    const agreementText = document.createElement('span');
    agreementText.setAttribute('class', 'agreement');
    agreementText.innerText = 'Нажимая «Оформить заказ», Вы даёте Согласие на обработку Ваших персональных данных и принимаете Пользовательское соглашение.'

    paymentBillContent.appendChild(billHeader);
    paymentBillContent.appendChild(carts);
    paymentBillContent.appendChild(billDetail);
    paymentBillContent.appendChild(billTotal);
    paymentBillContent.appendChild(purchaseBtn);
    paymentBillContent.appendChild(agreementText);
    return paymentBillContent;
}