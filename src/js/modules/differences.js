export default class Differences {
    constructor(newOfficer, oldOfficer, items) {
        this.newOfficer = document.querySelector(newOfficer);
        this.oldOfficer = document.querySelector(oldOfficer);
        this.newItems = this.newOfficer.querySelectorAll(items);
        this.oldItems = this.oldOfficer.querySelectorAll(items);
        this.newCounter = 0;
        this.oldCounter = 0;
    }

    hideCards(cards) {
        cards.forEach((item, i, array) => {
            if (i < array.length - 1) {
                item.style.display = 'none';
            }
        });
    }

    addCards(container, cards, counter) {
        container.querySelector('.plus').addEventListener('click', () => {
            cards[counter].style.display = 'flex';
            counter++;
            if (counter === (cards.length - 1)) {
                cards[cards.length - 1].style.display = 'none';
            }
        });
    }

    init() {
        this.hideCards(this.newItems);
        this.hideCards(this.oldItems);
        this.addCards(this.newOfficer, this.newItems, this.newCounter);
        this.addCards(this.oldOfficer, this.oldItems, this.oldCounter);
    }
}