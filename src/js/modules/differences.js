export default class Differences {
    constructor(newOfficer, oldOfficer, items) {
        try{
            this.newOfficer = document.querySelector(newOfficer);
            this.oldOfficer = document.querySelector(oldOfficer);
            this.newItems = this.newOfficer.querySelectorAll(items);
            this.oldItems = this.oldOfficer.querySelectorAll(items);
            this.newCounter = 0;
            this.oldCounter = 0;
        } catch(e){}
    }

    hideCards(cards) {
        cards.forEach((item, i, array) => {
            if (i < array.length - 1) {
                item.style.display = 'none';
                item.classList.remove('fadeInUp');
            }
        });
    }

    addCards(container, cards, counter) {
        container.querySelector('.plus').addEventListener('click', () => {
            cards[counter].classList.add('animated', 'fadeInUp');
            cards[counter].style.display = 'flex';
            counter++;
            if (counter === (cards.length - 1)) {   //исчезновение триггера при появлении 3го блока
                cards[cards.length - 1].style.display = 'none';
            }
        });
    }

    init() {
        try{
            this.hideCards(this.newItems);
            this.hideCards(this.oldItems);
            this.addCards(this.newOfficer, this.newItems, this.newCounter);
            this.addCards(this.oldOfficer, this.oldItems, this.oldCounter);
        } catch(e){}
    }
}