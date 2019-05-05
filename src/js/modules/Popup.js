export default class Popup {
    constructor(configs) {
        this.defaultConfigs = {
            popupClass: '.popup',
            popupClose: '.popup__close',
            popupContent: '.popup__content',
            popupActive: 'popup__active'
        };

        this.configs = Object.assign({}, this.defaultConfigs, configs || {});

        this.init();
    }

    init() {
        this.popupNode = document.querySelector(this.configs.popupClass);
        this.popupCloseBtn = this.popupNode.querySelector(this.configs.popupClose);

        this.setEventListeners();
    }

    setEventListeners() {
        this.popupCloseBtn.addEventListener('click', () => {
            this.hide();
        })
    }

    show() {
        console.log('WAS');
        this.popupNode.classList.add(this.configs.popupActive);
    }

    hide() {
        this.popupNode.classList.remove(this.configs.popupActive);
    }
}