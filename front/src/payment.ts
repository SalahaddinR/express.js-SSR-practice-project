import { createPaymentBill } from "./generateTemplate";

document.addEventListener('DOMContentLoaded', async event => {
    Array.from(document.querySelectorAll('.paymentForm')).forEach(
        paymentForm => {
            paymentForm.addEventListener('click', event => {
                Array.from(document.querySelectorAll('.paymentForm')).forEach(
                    element => {
                        element.setAttribute('id', '');
                    }
                );

                // @ts-ignore
                event.currentTarget.setAttribute('id', 'selected')
            })
        }
    )

    document.querySelector('.rightContent').appendChild(createPaymentBill());   
})