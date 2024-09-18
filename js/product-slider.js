$(document).ready(() => {
    const productMiniSlider = new Swiper('.product__mini-slider', {
        slidesPerView: 2.13,
        freeMode: true,
        watchSlidesProgress: true,
        breakpoints: {
            769: {
                slidesPerView: 4.31
            }
        }
    });

    const productSlider = new Swiper('.product__slider', {
        speed: 750,
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        navigation: {
            nextEl: '.product__slider__arrows .swiper-button-next',
            prevEl: '.product__slider__arrows .swiper-button-prev'
        },
        thumbs: {
            swiper: productMiniSlider
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        }
    });
});