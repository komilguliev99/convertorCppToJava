export default class Selector {
    constructor(config) {
        this.selectClass = ".selector";
        this.selectList = ".selector__list";
        this.selectListItem = ".selector__list-item";
        this.selectedItem = ".selector__selected";
        this.protoClass = ".selector-proto";
        this.activeClass = "selector__active";

        this.init();
        this.setListeners();
    }

    init() {
        const arrSelect = Array.from(document.querySelectorAll(this.protoClass));

        arrSelect.forEach(el => {
            let listItem = el.querySelectorAll('option');
            let list = '';
            for(let i = 0; i < listItem.length; i++)
                if(i !== 0) 
                    list += `<div class="selector__list-item" data-item="${i}">${listItem[i].textContent}</div>`;

            let markup = `
                <div class="selector__selected" target="${el.dataset.target}">${el.dataset.placeHolder}: </div>

                <div class="selector__list">
                    ${list}
                </div>
            `;

            let div = document.createElement('div');
            div.className = "selector";
            div.innerHTML = markup;
            div.dataset.ID = el.dataset.id;

            let parent = el.parentElement;
            parent.insertBefore(div, el.nextSibling);
        })

    }

    setListeners() {
        const arrSelector = document.querySelectorAll(this.selectClass);
        const arrSelect = document.querySelectorAll(this.protoClass);

        for(let i = 0; i < arrSelector.length; i++) {
            arrSelector[i].addEventListener('click', e => {

                if(e.target.classList.contains(this.selectedItem.slice(1))) {
                    console.log('was clicked');
                    e.target.parentElement.classList.toggle(this.activeClass);
                } else {
                    let val = e.target.textContent;
                    const listItem = Array.from(e.target.parentElement.querySelectorAll('div'));

                    listItem.forEach(el => el.classList.remove('selected'));
                    e.target.classList.add('selected');

                    console.log(e.target.parentElement.previousElementSibling);

                    e.target.parentElement.previousElementSibling.innerHTML = val;
                    const select = e.target.parentElement.parentElement.previousElementSibling;
                    select.querySelectorAll('option')[e.target.dataset.item].setAttribute('selected', true);

                    e.target.parentElement.parentElement.classList.toggle(this.activeClass);
                }
            }, true);
        }
    }
}