export default class Accordion {
    constructor(triggersSelector) {
        this.triggers = document.querySelectorAll(triggersSelector);
    }

    init() {
        this.triggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                const block = trigger.closest('.module__info-show').nextElementSibling;
                block.classList.add('animated');

                if (block.style.display === 'flex') {
                    block.classList.remove('fadeInUp');
                    block.style.display = 'none';
                } else {
                    block.classList.add('fadeInUp');
                    block.style.display = 'flex';
                }
            });
        });
    }
}