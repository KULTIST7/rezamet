$(document).ready(() => {
    setTimeout(adaptiveHeaderNav, 150);

    Fancybox.bind("[data-fancybox]");

    $('input[type=tel]').inputmask({
        mask: '+7 (*{1}99) 999-99-99',
        placeholder: "+7 (___) ___-__-__",
        definitions: {
            '*': {
                validator: "[0-6,9]"
            }
        }
    });

    $(window).on('resize', adaptiveHeaderNav);

    $('.menu__more>p').on('mouseenter', function() {
        $($(this).parent().children()[1]).addClass('active');
    });

    $('.menu-hidden').on('mouseleave', function() {
        setTimeout(()=>{$(this).removeClass('active')}, 500);
    });

    $(document).on('scroll', function() {
        if ($(window).scrollTop() >= 800) {
            $('.up').removeClass('up-invisible');
        } else {
            $('.up').addClass('up-invisible');
        }
    });

    $('.header__burger-btn').on('click', () => {
        $('.burger').toggleClass('active');
        $('body').toggleClass('body-noscroll');
    });
    
    $('.burger__close').on('click', () => {
        $('.burger').removeClass('active');
        $('body').removeClass('body-noscroll');
    });

    $('.up__button').on('click', () => {
        const body = $("html, body");
        body.animate({scrollTop:0}, 500, 'swing');
    });

    $(document).on('scroll', function() {
        if ($(window).scrollTop() >= 150) {
            $('.header-fixed').removeClass('hidden');
        } else {
            $('.header-fixed').addClass('hidden');
        }
    });

    $('.drop-down-products-hover').on('mouseenter', function () {
        $('.drop-down-equipment').slideUp('fast');
        $('.drop-down-products').slideDown('fast');
    });

    $('.drop-down-equipment-hover').on('mouseenter', function () {
        $('.drop-down-products').slideUp('fast');
        $('.drop-down-equipment').slideDown('fast');
    });

    $('.drop-down').on('mouseleave', function () {
        $('.drop-down-products').slideUp('fast');
        $('.drop-down-equipment').slideUp('fast');
    });

    $('.drop-down__list>li').on('mouseenter', function() {
        $($($(this).parent().children()).children()).removeClass('active');
        $($($(this).children())[0]).addClass('active');

        let id = $($($(this).children())[0]).attr('id');
        $($($($($(this).parent()).parent().children())[1]).children()).removeClass('active');
        $($(`div#${id}`)).addClass('active');
    });

    $('.product__information__tabs>div').on('click', function() {
        $('.product__information__tabs>div').removeClass('active');
        $(this).addClass('active');

        for (let i = 0; i < $('.product__information__item').length; i++) {
            if ($($('.product__information__item')[i]).data('tab') == $(this).data('tab')) {
                $('.product__information__item').removeClass('active');
                $($('.product__information__item')[i]).addClass('active');
            }
        }
    });
});

function adaptiveHeaderNav() {
    let windowWidth = $(window).width();

    do {
        let menuWidth = (windowWidth - $('.header>.section-box').outerWidth()) + $('.header .menu').outerWidth() - 100;
        if (menuWidth < windowWidth || !$('.header .menu').children().length) {
            return false;
        }

        $('.header .menu>li:last-of-type').prependTo($('.header .menu-hidden')); 
        $('.header .menu__more>p').addClass('active');
    }
    while(true);
}

function sliderPaginationRender(slider, sliderClass) {
    $(`.${sliderClass} .pagination__current`).html(`${slider.activeIndex + 1 < 10 ? '0' :''}${slider.activeIndex + 1}`);
    $(`.${sliderClass} .pagination__all`).html(`${$(`.${sliderClass} .swiper-slide`).length < 10 ? '0' : ''}${$(`.${sliderClass} .swiper-slide`).length}`);
}