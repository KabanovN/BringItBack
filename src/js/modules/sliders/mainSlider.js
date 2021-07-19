import Slider from './slider';

export default class MainSlider extends Slider {
    constructor(container, triggerNext, triggerPrev) {
        super(container, triggerNext, triggerPrev);
    }

    showSlides(n) {
        if (n < 1) {
            this.slideIndex = this.slides.length;
        }

        if (n > this.slides.length) {
            this.slideIndex = 1;
        }

        try {
            this.hanson.style.display = 'none';    
            
            if (n === 3) {
                setTimeout(() => {
                    this.hanson.style.display = 'block';
                    this.hanson.classList.add('animated', 'fadeInUp');
                }, 3000);
            } else {
                this.hanson.classList.remove('fadeInUp');
            }
        } catch(e){}

        this.slides.forEach(slide => {
            slide.style.display = 'none';
        });

        this.slides[this.slideIndex - 1].style.display = 'block';
    }

    plusSlides(n) {
        this.showSlides(this.slideIndex += n);
    }

    bindTriggers(triggers, n) {
        triggers.forEach(trigger => {
            trigger.addEventListener('click', (evt) => {
                evt.preventDefault();
                this.plusSlides(n); 
                // this.showSlides(this.slideIndex += 1); - вариант без plusSlides
            });

            // переход на 1ю страницу при клике на логотип "D"
            trigger.parentNode.previousElementSibling.addEventListener('click', (evt) => {
                evt.preventDefault();
                this.slideIndex = 1;
                this.showSlides(this.slideIndex);
            });
        });
    }

    render() {
        if (this.container) {
            try{
                this.hanson = document.querySelector('.hanson');
            } catch(e){}

            this.bindTriggers(this.triggerNext, 1);
            this.bindTriggers(this.triggerPrev, -1);
        }
    }
}