import { applicationSettings, mockCartData, mockCatalogueIntroData } from "../mockData";
import { createCatalogue } from '../generateTemplate';

if (document.getElementById('workDays')) {
    document.getElementById('workDays').innerHTML = applicationSettings.workDays;
}
if (document.getElementById('workHours')) {
    document.getElementById('workHours').innerHTML = applicationSettings.workHours;
}
if (document.getElementById('phoneNumber')) {
    document.getElementById('phoneNumber').innerText = applicationSettings.contactPhone;
}
if (document.querySelector('.address')) {
    document.querySelector('.address').innerHTML = `Адрес: ${applicationSettings.address}`;
}
if (document.querySelector('.phone')) {
    document.querySelector('.phone').innerHTML = `Тел.: ${applicationSettings.contactPhone}`;
}
if (document.querySelector('.phone')) {
    document.querySelector('.phone').innerHTML = `Тел.: ${applicationSettings.contactPhone}`;
}
if (document.querySelector('.workdays')) {
    document.querySelector('.workdays').innerHTML = `График работы: ${applicationSettings.workDays}" ${applicationSettings.workHours}`;
}
if ( document.querySelector('.email')) {
    document.querySelector('.email').innerHTML = `E-mail: ${applicationSettings.email}`;
}
mockCatalogueIntroData.forEach(
    catalogueData => {
        const catalogue = createCatalogue(catalogueData);
        const content = document.querySelector('.catelogue-content');
        if (content) {
            content.appendChild(catalogue);
        }
    }
)

export function updateCart(itemsCount: number, totalPrice: number) {
    document.querySelector('.totalPrice').innerHTML = totalPrice.toString() + ' ₽';
    document.querySelector('.count').innerHTML = itemsCount.toString();
}