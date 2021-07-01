export default class Slider {
    constructor(page, triggers) {
        this.page = document.querySelector(page);
        this.slides = this.page.children;
        this.triggers = document.querySelectorAll(triggers);
        this.slideIndex = 1;
    }

    showSlides(n) {
        if (n < 1) {
            this.slideIndex = this.slides.length;
        }

        if (n > this.slides.length) {
            this.slideIndex = 1;
        }

        this.slides.forEach(slide => {
            slide.style.display = 'none';
        });

        this.slides[this.slideIndex - 1].style.display = 'block';
    }

    plusSlides(n) {
        this.showSlides(this.slideIndex += n);
    }

    render() {
        this.triggers.forEach(trigger => {
            trigger.addEventListener('click', (evt) => {
                evt.preventDefault();
                this.plusSlides(1);
            });

            trigger.parentNode.previousElementSibling.addEventListener('click', (evt) => {
                evt.preventDefault();
                this.slideIndex = 1;
                this.showSlides(this.slideIndex);
            });
        });
    }
}