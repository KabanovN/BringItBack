export default class Slider {
    constructor({container = null, triggers = null, next = null, prev = null, activeClass = '', autoplay, animate} = {}) {
        this.container = document.querySelector(container);
        this.slides = this.container.children;
        this.triggers = document.querySelectorAll(triggers);
        this.next = document.querySelector(next);
        this.prev = document.querySelector(prev);
        this.activeClass = activeClass;
        this.autoplay = autoplay;
        this.animate = animate;
        this.slideIndex = 1;
    }
}