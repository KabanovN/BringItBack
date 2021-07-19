export default class Slider {
    constructor({
        container = null, 
        triggerNext = null, //переключатель "вперед" главного слайдера
        triggerPrev = null, //переключатель "назад" главного слайдера для страницы modules.html
        next = null, 
        prev = null, 
        activeClass = '', 
        autoplay, 
        animate
    } = {}) {
        this.container = document.querySelector(container);
        try{this.slides = this.container.children;} catch(e){}
        this.triggerNext = document.querySelectorAll(triggerNext);
        this.triggerPrev = document.querySelectorAll(triggerPrev);
        this.next = document.querySelector(next);
        this.prev = document.querySelector(prev);
        this.activeClass = activeClass;
        this.autoplay = autoplay;
        this.animate = animate;
        this.slideIndex = 1;
    }
}