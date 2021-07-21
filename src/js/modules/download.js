export default class Download {
    constructor(triggersSelector) {
        this.triggers = document.querySelectorAll(triggersSelector);
        this.path = 'assets/img/evolve.jpg'; //путь файла для скачивания
    }

    // создаём ссылку, добавляем на страницу с нужными атрибутами, удаляем после принудительного клика
    download(path) {
        const elem = document.createElement('a');

        elem.setAttribute('href', path);
        elem.setAttribute('download', 'picture');

        elem.style.display = 'none';
        document.body.append(elem);

        elem.click();

        document.body.removeChild(elem);
    }

    init() {
        this.triggers.forEach(trigger => {
            trigger.addEventListener('click', (evt) => {
                evt.preventDefault();
                evt.stopPropagation(); //отмена всплытия и перезагрузки страницы при скачивании
                this.download(this.path);
            });
        });
    }
}