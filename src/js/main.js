import Selector from "./modules/Selector";
import { langData } from "./lib/langData";
import Convertor from "./modules/Convertor";
import Popup from "./modules/Popup";



// Initializing the Selectors
new Selector();


// Initializing Convertor
const convertorInst = new Convertor(langData);

// Init Popup
const popupInst = new Popup();



// CONTROLLER
const mainControler = {
    runBtnClass: '.btn--run',
    from: 'from',
    to: 'to',
    languages: ['cpp', 'java'],
    init() {
        this.runBtn = document.querySelector(this.runBtnClass);
        this.fromSelector = document.getElementById(this.from);
        this.toSelector = document.getElementById(this.to);

        this.setListeners();
    },

    setListeners() {
        this.runBtn.addEventListener('click', e => {
            const from = document.getElementById(this.from).value;
            const to = document.getElementById(this.to).value;

            console.log(from, to);

            let check = 0;
            this.languages.forEach(el => {
                if(el === from) check++;
                if(el === to) check++;
            });

            if(check < 2) {
                popupInst.show();
            } else {
                convertorInst.convertCode(to);
            }
        });

    }

}


mainControler.init();