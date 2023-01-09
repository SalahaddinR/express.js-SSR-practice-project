import axios from 'axios';
import { Product } from './generateTemplate';
import { cartElement } from './generatePopUps';

interface LoginCredentials {
    email: string,
    password: string
};

interface UserData {
    firstname: string,
    lastname: string,
    password: string,
    email: string
}

interface Cart {
    product: string,
    user: string,
    amount: number,
    _id: string
}

export async function getProductsBysubcatagory(category: string): Promise<Array<Product>> {
    const products = await axios.get(`http://localhost:4000/api/products/subcat/${category}`);
    return products.data;
}

export async function getProduct(id: string): Promise<Product> {
    const product = await axios.get(`http://localhost:4000/api/products/${id}`);
    return product.data;
}

export async function updateProduct(id: string, data: any) {
    const product = await axios.put(`http://localhost:4000/api/products/${id}`, data);
    return product.data;
}

export async function getCurrentUser(token: string) {
    if (!token) return false;
    try {
        const user = await axios.get('http://localhost:4000/api/users/me', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return user.data;
    }
    catch (erro) {
        return false;
    }
}

export async function loginUser(credentials: LoginCredentials) {
    const body = JSON.stringify(credentials);
    try {
        const user = await axios.post('http://localhost:4000/api/users/login', body, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return user.data;
    }
    catch (error) {
        return false;
    }
}

export async function registerUser(userData: UserData) {
    const body = JSON.stringify(userData);
    try {
        const user = await axios.post('http://localhost:4000/api/users/register', body, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!user.data.message) {
            return user.data;
        }
        else {
            return false;
        }
    }
    catch (error) {
        return false;
    }
}

export async function getUserCart(userID: string) {
    const cart = await axios.get(`http://localhost:4000/api/carts/of-user/${userID}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
    });
    if (cart.data) {
        return cart.data
    }
    else {
        return false;
    }
}

export async function createUserCart(products: Array<Cart>): Promise<Array<cartElement>> {
    const resultStorage: Array<cartElement> = [];
    for (let index = 0; index < products.length; index++) {
        const product = await getProduct(products[index].product);

        if (product) {
            const cartElementData: cartElement = {
                id: product._id,
                title: product.name,
                price: product.price,
                count: products[index].amount,
                imageSrc: product.images[0],
                cartID: products[index]._id
            };

            resultStorage.push(cartElementData);
        }
    }
    return resultStorage;
}

export async function addToCart(userID: string, productID: string, amount: number)  {
    const data = {
        product: productID,
        user: userID,
        amount
    };

    const addedItem = await axios.post('http://localhost:4000/api/carts/', data, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
    });

    if (!addedItem.data.message) {
        const products = JSON.parse(localStorage.getItem('userCart'));
        const productData = await getProduct(addedItem.data.product);
        await axios.put(`http://localhost:4000/api/products/${productID}`, {
            amount: productData.amount - amount
        });

        const productElement =
            {
                id: productData._id,
                title: productData.name,
                price: productData.price,
                imageSrc: productData.images[0],
                count: addedItem.data.amount,
                cartID: addedItem.data._id
            }

        products.push(productElement);
        localStorage.setItem('userCart', JSON.stringify(products));
        return productElement;
    }
}

export async function removeFromCart(productID: string, userID: string) {
    try {
        const deletedItem = await axios.delete(`http://localhost:4000/api/carts/${userID}/${productID}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        });
        if (!deletedItem.data.message) {
            return deletedItem.data;
        }
    }
    catch(error) {
        return false;
    }
    return false;
}

export async function updateUserCart(cartID: string, amount: number) {
    try {
        const updatedCart = await axios.put(`http://localhost:4000/api/carts/${cartID}`, {amount}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        });

        if (updatedCart.data) {
            return updatedCart.data
        }
    }
    catch(error) {
        console.log(error);
    }
    return false;
}