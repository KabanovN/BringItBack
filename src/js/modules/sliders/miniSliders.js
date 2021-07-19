import Slider from "./slider";

export default class MiniSlider extends Slider {
    constructor(container, next, prev, activeClass) {
        super(container, next, prev, activeClass);
    }

    activateSlides() {
        this.slides.forEach(slide => {
            slide.classList.remove(this.activeClass);

            if (this.animate) {
                slide.querySelector('.card__controls-arrow').style.opacity = '0';
                slide.querySelector('.card__title').style.opacity = '0.4';
            }
        });

        if (this.slides[0].tagName !== 'BUTTON') {
            this.slides[0].classList.add(this.activeClass);
        }

        if (this.animate) {
            this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
            this.slides[0].querySelector('.card__title').style.opacity = '1';
        }
    }

    bindTriggers() {
        this.next.addEventListener('click', () => {
            // перемещение кнопки, являющейся слайдом в верстке (проще вынести отдельно в вёрстке)
            this.slides.forEach(slide => {
                if (slide.tagName === 'BUTTON') {
                    this.container.append(slide);
                }
            });
            this.container.append(this.slides[0]);
            this.activateSlides();        
        });

        this.prev.addEventListener('click', () => {
            this.slides.forEach(slide => {
                if (slide.tagName === 'BUTTON') {
                    this.container.insertBefore(slide, this.slides[1]);
                }
            });
            this.container.insertBefore(this.slides[this.slides.length - 1], this.slides[0]);
            this.activateSlides();
        });
    }

    init() {
        try{
            this.container.style.cssText = `
                display: flex;
                flex-wrap: wrap;
                overflow: hidden;
            `;

            this.bindTriggers();
            this.activateSlides();
        } catch(e){}
    }
}