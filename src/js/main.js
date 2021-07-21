import MainSlider from './modules/sliders/mainSlider';
import MiniSlider from './modules/sliders/miniSliders';
import VideoPlayer from './modules/playVideos';
import Forms from './modules/forms';
import Differences from './modules/differences';
import Accordion from './modules/accordion';
import Download from './modules/download';

window.addEventListener('DOMContentLoaded', () => {
    const slider = new MainSlider({triggerNext: '.next', container: '.page'});
    slider.render();

    const modulePageSlider = new MainSlider({container: '.moduleapp', triggerNext: '.next', triggerPrev: '.prev'});
    modulePageSlider.render();

    const showUpSlider = new MiniSlider({
        container: '.showup__content-slider',
        next: '.showup__next',
        prev: '.showup__prev',
        activeClass: 'card-active',
        animate: true
    });
    showUpSlider.init();

    const modulesSlider = new MiniSlider({
        container: '.modules__content-slider',
        next: '.modules__info-btns .slick-next',
        prev: '.modules__info-btns .slick-prev',
        activeClass: 'card-active',
        animate: true
    });
    modulesSlider.init();

    const feedSlider = new MiniSlider({
        container: '.feed__slider',
        next: '.feed__slider .slick-next',
        prev: '.feed__slider .slick-prev',
        activeClass: 'feed__item-active'
    });
    feedSlider.init();

    new VideoPlayer('.showup .play', '.overlay').init();
    new VideoPlayer('.module__video .play', '.overlay').init();

    new Forms('.form').init();
    new Differences('.officernew','.officerold', '.officer__card-item').init();

    new Accordion('.module__info-show .plus').init();

    new Download('.download').init();
});