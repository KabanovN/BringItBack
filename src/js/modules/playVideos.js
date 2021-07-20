export default class VideoPlayer {
    constructor(triggers, modal) {
        this.btns = document.querySelectorAll(triggers);
        this.overlay = document.querySelector(modal);
        this.close = this.overlay.querySelector('.close');
        this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
    }

    bindTriggers() {
        this.btns.forEach((btn, i) => {
            try{
                // для каждого следующего видео-блока устанавливаем data-disabled => true
                const blockedElement = btn.closest('.module__video-item').nextElementSibling;

                if (i !== 1) {
                    blockedElement.setAttribute('data-disabled', 'true');
                }
            } catch(e){}

            btn.addEventListener('click', () => {
                // если блок не заблокирован или отсутствует - запускаем видео
                if (!btn.closest('.module__video-item') || 
                    btn.closest('.module__video-item').getAttribute('data-disabled') !== 'true') {
                    this.activeBtn = btn; //для метода onPlayerStateChange

                    if (this.player) {
                        this.overlay.style.display = 'flex';
                        // ссылка на видео указана в data-url кнопки
                        if (this.path !== btn.getAttribute('data-url')) {
                            this.path = btn.getAttribute('data-url');
                            //функ-я загрузки и воспр-я указанного видео (YT Player API)
                            this.player.loadVideoById({videoId: this.path}); 
                        }
                    } else {
                        this.path = btn.getAttribute('data-url');
                        this.createPlayer(this.path);
                        this.overlay.style.display = 'flex';
                    }
                }
            });
        });
    }

    bindCloseBtn() {
        this.close.addEventListener('click', () => {
            this.overlay.style.display = 'none';
            this.player.stopVideo(); //для сброса воспроизведения
        });
    }

    // youtube videoplayer API - согласно документации
    createPlayer(url) {
        this.player = new YT.Player('frame', {
            height: '100%',
            width: '100%',
            videoId: `${url}`,
            events: {
                'onStateChange': this.onPlayerStateChange 
                // чтобы контекст this не терялся, т.к. запуск идёт в экземпляре класса YT.Player,
                // сделаем жесткую привязку(bind) к this в конструкторе
              }
        });
    }

    // изменение стилей соседнего блока при воспроизведении текущего
    onPlayerStateChange(event) {
        try{
            // находим соседний элемент ближайщей ноды с классом (родителя)
            const blockedElement = this.activeBtn.closest('.module__video-item').nextElementSibling;
            // создаем элемент активной кнопки воспроизведения, копируя svg
            const playBtn = this.activeBtn.querySelector('svg').cloneNode(true);

            // event.data = 0 => согласно документации API - воспроизведение видео завершено
            //меняем текст в блоке, убираем ненужные классы/фильтр, добавляем активную svg и непрозрачность
            if (event.data === 0) {
                blockedElement.querySelector('.play__text').textContent = 'play video';
                blockedElement.querySelector('.play__text').classList.remove('attention');
                blockedElement.querySelector('.play__circle').classList.remove('closed');
                blockedElement.querySelector('svg').remove();
                blockedElement.querySelector('.play__circle').append(playBtn);
                blockedElement.style.opacity = 1;
                blockedElement.style.filter = 'none';
                blockedElement.setAttribute('data-disabled', 'false');
            }
        } catch(e){}
    }

    // инициализация запуска YT API
    init() {
        if (this.btns.length > 0) {
            //согласно документации API
            const tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    
            this.bindTriggers();
            this.bindCloseBtn();
        }
    }

}