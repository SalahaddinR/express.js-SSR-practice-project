import { createProductMedium, createNavigation } from "./generateTemplate";
import { mockCatalogueIntroData } from "./mockData";
import { getProductsBysubcatagory } from "./requests";

document.addEventListener('DOMContentLoaded', async () => {
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

    const category = decodeURI(cookieMap.filter(cookieElement => cookieElement.name.trim() === 'category')[0].value);
    const name = decodeURI(cookieMap.filter(cookieElement => cookieElement.name.trim() === 'name')[0].value);

    const catalog = mockCatalogueIntroData.filter(item  => item.title === category)[0];
    document.querySelector('.catalog').appendChild(createNavigation(catalog));

    Array.from(document.querySelectorAll('.catalogueItem')).forEach(
        element => {
            if (element.innerHTML.toLowerCase() != name.toLocaleLowerCase()) {
                element.classList.remove('current');
            }
        }   
    )

    Array.from(document.querySelectorAll('.catalogueItem')).forEach(
        element => {
            if (element.innerHTML.toLowerCase() == name.toLocaleLowerCase()) {
                element.classList.add('current');
            }
        }   
    )

    const productsContent = document.createElement('div');
    productsContent.setAttribute('class', 'productsContent');

    const products = await getProductsBysubcatagory(name);
    products.forEach(
        async product => {
            const productElement = await createProductMedium(product);
            productsContent.appendChild(productElement);
        }
    )

    document.querySelector('.catalog').appendChild(productsContent);
})

window.addEventListener( "pageshow", function ( event ) {
    var historyTraversal = event.persisted || 
                           (typeof window.performance != "undefined" && 
                                window.performance.navigation.type === 2 );
    if ( historyTraversal ) {
      window.location.reload();
    }
});