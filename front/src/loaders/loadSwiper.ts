import Swiper, { Navigation, Pagination, Autoplay }  from 'swiper';

document.addEventListener('DOMContentLoaded', event => {
    new Swiper('.swiper', {
        modules: [Navigation, Pagination, Autoplay],
        loop: true,
        autoplay: {
            delay: 3000
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
        }
    })
})