$(document).ready(() => {
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
});