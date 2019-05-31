import Selector from "./modules/Selector";
import { langData } from "./lib/langData";
import Convertor from "./modules/Convertor";
import Popup from "./modules/Popup";

//const fs = require('fs');


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
    upload: '#upload-input',
    languages: ['cpp', 'java'],
    init() {
        this.runBtn = document.querySelector(this.runBtnClass);
        this.fromSelector = document.getElementById(this.from);
        this.toSelector = document.getElementById(this.to);

        this.setListeners();
    },

    setListeners() {
        this.runBtn.addEventListener('click', e => {
            //const from = document.getElementById(this.from).value;
            //const to = document.getElementById(this.to).value;
            // let file = 'P:/coursera/develop_in_cpp/Specialization_Develop_in_CPP/base_containers_oth/task3.cpp';
            // var fso = new ActiveXObject("Scripting.FileSystemObject");
            // var f = fso.OpenTextFile(file);
            // while (!f.AtEndOfStream)
            //     console.log(f.ReadLine()); f .Close ();

            const from = 'cpp', to = 'java';
            // console.log(from, to);

            let check = 0;
            this.languages.forEach(el => {
                if(el === from) check++;
                if(el === to) check++;
            });

            if(check < 2) {
                popupInst.show();
            } else {
                // if(file)
                    convertorInst.setCode();
                    convertorInst.convertCode(to);
            }
        });

    }

}

mainControler.init();

var fileAPISupport = false;
if(window.File && window.FileReader && window.FileList && window.Blob) {
  fileAPISupport = true;
  console.log('FILE_SUPPORT_TRUE');
  let file = 'P:/coursera/develop_in_cpp/Specialization_Develop_in_CPP/base_containers_oth/task3.cpp';

}