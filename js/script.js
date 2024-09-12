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

    const mainSlider = new Swiper('.main-slider', {
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        pagination: {
            el: ".main-slider .swiper-pagination",
            clickable: true,
            type: 'progressbar',
        },
    });

    let mainSliderControl = {

        init: function () {
            this.slider = $('#main-slider');
            this.swiper = this.slider[0].swiper;
            this.index_slider_video = {};
   
            this.swiper.slides.forEach(slide => {
                if ($(slide).find('.video').length) {
                    switch ($(slide).find('.video').attr('data-type')) {
                        case 'video':
                            this.swiper.on('slideChange', () => this.playVideo(slide, $(slide).find('.video')));
                            this.playVideo(slide, $(slide).find('.video'));
                            break;
   
                        case 'vk':
                            const player = VK.VideoPlayer($(slide).find('.video')[0]);
                            this.swiper.on('slideChange', () => this.playVK(slide, player));
                            this.playVK(slide, player);
                            break;
   
                        case 'youtube':
                            // this.readyYoutube(slide, $(slide).find('.video'));
                            break;
                    }
                }
            });
        },
   
        playVideo: function (slide, videoEl) {
            const id = videoEl.attr('id');
   
            if (this.index_slider_video[id] === undefined) {
                this.index_slider_video[id] = videoEl;
            }
   
            videoEl[0].pause();
            videoEl[0].currentTime = 0;
   
            if (this.swiper.slides[this.swiper.activeIndex] === slide) {
                videoEl[0].play();
                videoEl[0].volume = 0;
            }
        },
   
        playVK: function (slide, player) {
            player.pause();
            player.seek(0);
   
            if (this.swiper.slides[this.swiper.activeIndex] === slide) {
                player.play();
                player.mute();
            }
        },
   
        readyYoutube: function (slide, videoEl) {
            if ((typeof YT !== "undefined") && YT && YT.Player) {
                this.swiper.on('slideChange', () => this.playYT(slide, videoEl));
                this.playYT(slide, videoEl);
            } else {
                setTimeout(() => this.swiper.on('slideChange', () => this.playYT(slide, videoEl)), 100);
                setTimeout(this.playYT(slide, videoEl), 100);
            }
        },
   
        playYT: function (slide, videoEl) {
            const id = videoEl.attr('id');
   
            if (this.index_slider_video[id] === undefined) {
                this.index_slider_video[id] = new YT.Player(id, {
                    height: '100%',
                    width: '100%',
                    origin: 'https://' + window.location.host,
                    playerVars: {
                        autoplay: 0,
                        controls: 0,
                        iv_load_policy: 3,
                        rel: 0
                    },
                    videoId: videoEl.attr('data-link'),
                    events: {
                        onReady: function () {
                            index_slider_video[id].playVideo();
                            index_slider_video[id].mute();
                        },
                        onStateChange: function (event) {
                            if (event.data == YT.PlayerState.ENDED) {
                                setTimeout(function () {
                                    $('.index_slider').slick('slickNext');
                                }, 2000);
                            }
                        }
                    }
                });
            } else {
                index_slider_video[id].playVideo();
            }
        }
    }

    mainSliderControl.init();

    sliderPaginationRender(mainSlider, 'main-slider');

    mainSlider.on('slideChange', function() {
        sliderPaginationRender(mainSlider, 'main-slider');
    });

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

    $('.header').on('mouseleave', function () {
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