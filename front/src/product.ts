import { getProduct } from "./requests";
import { createProductLarge } from "./generateTemplate"; 

document.addEventListener('DOMContentLoaded', async ()=> {
    const cookie = document.cookie.split(';');
    const cookieMap: Array<{
        name: string, 
        value: string
    }> = [];
    cookie.forEach(
        cookieElement => {
            const [cookieName, cookieValue] = cookieElement.split('=');
            const element = {
                name: cookieName,
                value: cookieValue
            }
            cookieMap.push(element);
        }
    )

    const productID = decodeURI(cookieMap.filter(cookieElement => cookieElement.name.trim() === 'id')[0].value)
    
    const product = await getProduct(productID);
    const productElement = await createProductLarge(product);
    document.querySelector('.productMainContainer').appendChild(productElement);

    document.querySelector(`.decreaseAmountProduct${product._id}`).addEventListener('click', event => {
        const previosValue = Number(localStorage.getItem(`productAmount${product._id}`));
        if (previosValue > 0) {
            const newValue = String(previosValue - 1);
            localStorage.setItem(`productAmount${product._id}`, newValue);
            document.querySelector(`.amountController${product._id}`).innerHTML = newValue;
        }
    })

    document.querySelector(`.increaseAmountProduct${product._id}`).addEventListener('click', event => {
        const previosValue = Number(localStorage.getItem(`productAmount${product._id}`));
        if (previosValue < product.amount) {
            const newValue = String(previosValue + 1);
            localStorage.setItem(`productAmount${product._id}`, newValue);
            document.querySelector(`.amountController${product._id}`).innerHTML = newValue;
        }
    })


    
})