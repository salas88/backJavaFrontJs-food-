/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 95:0-14 */
/***/ ((module) => {

function calc () {
    const result = document.querySelector('.calculating__result span');
    let sex, weight, height, age, ratio;    
    
    sex = localStorage.getItem("sex") ? localStorage.getItem('sex') : 'female';
    ratio = localStorage.getItem('rario') ? localStorage.getItem('ratio') : 1.375;

    function cheakLocalStorageAndSetValue(selector, activClass) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(item => {
            item.classList.remove(activClass);
            if(item.getAttribute('id') === localStorage.getItem('sex')){
                item.classList.add(activClass);
            }
            if(item.getAttribute('data-ratio') === localStorage.getItem('ratio')){
                item.classList.add(activClass);
            }
        })
    }
    cheakLocalStorageAndSetValue('#gender div', 'calculating__choose-item_active');
    cheakLocalStorageAndSetValue('.calculating__choose_big div', 'calculating__choose-item_active');
   
    function calcTotal(){

        if(!sex || !weight || !height || !age || !ratio){
            result.textContent = '____';
            return;
        }

        if(sex = 'female'){
            result.textContent = Math.round((447.6 +(9.2*weight)+(3.1*height)-(4.3*age)) * ratio);
        } else{
            result.textContent = Math.round((447.6 +(13.4*weight)+(4.8*height)-(5.7*age)) * ratio);
        }
    };

    function getStatickInformation(parentSelector, active){

        const elements = document.querySelectorAll(parentSelector);

        elements.forEach(element =>{
            element.addEventListener('click', (event)=>{
                if(event.target.getAttribute('data-ratio')){
                    ratio = +event.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +event.target.getAttribute('data-ratio'));
                } else{
                    sex = event.target.getAttribute('id');
                    localStorage.setItem('sex', event.target.getAttribute('id'));
                }
               
                elements.forEach(element =>{
                    element.classList.remove(active)
                }) 

                event.target.classList.add(active);
                calcTotal();
            })
        })
    }

    function getDynamicInformation(selector){
        const input = document.querySelector(selector);
        
        input.addEventListener('input', ()=> {

            if(input.value.match(/\D/g)){
                input.style.border = '1px solid red';
            }else{
                input.style.border = 'none';
            }

            switch(input.getAttribute('id')){
                case 'height':
                height = +input.value;
                break;
                case 'weight':
                weight = +input.value;
                break;
                case 'age':
                age = +input.value;
                break;
            }

            calcTotal();
        })
    }

    getStatickInformation('#gender div', 'calculating__choose-item_active');
    getStatickInformation('.calculating__choose_big div', 'calculating__choose-item_active');
    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
}

module.exports = calc;

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 87:0-14 */
/***/ ((module) => {

function cards() {
    class MenuItem{
        constructor(src, alt, subtitle, descr,total, parent, ...clacces){
            this.src = src;    
            this.alt = alt;
            this.subtitle = subtitle;
            this.descr = descr;
            this.total = total;
            this.parent = document.querySelector(parent);
            this.clacces = clacces;
            this.transfer = 27;
            this.tranferToUAH();
        }

        tranferToUAH(){
            this.total *= this.     transfer;
        }

        render(){
            const element = document.createElement('div');
            if(this.clacces.length === 0){
                element.classList.add('menu__item');
            }else{
                this.clacces.forEach(myClass => element.classList.add(myClass));
            }
            element.innerHTML = `
                <img src="${this.src}" alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.subtitle}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.total}</span> грн/день</div>
                </div>
            `
            this.parent.prepend(element);
        }
    }


//отправка форм!

     const sendDate = async (url, date) => {
         const req = await fetch(url, {
             method: "POST",
             headers: {
                 'Content-type' : 'application/json; charset=utf-8'
             },
             body: date
         });
        return await req.json();
     }


     const forms = document.querySelectorAll('form');
     forms.forEach(item => {
         item.addEventListener('submit', (event) => {
             event.preventDefault();
             const formDate = new FormData(item);
             const json = JSON.stringify(Object.fromEntries(formDate.entries()));
             sendDate('http://localhost:8080/root',json)
                .then(date => console.log(date))
                .then(() => forCloseModal());
         })
     })  

     //отправка продуктовых кароточе

        // олностью  готовый код для получения объектов для карточки товаров
          const getFetchFunction = async (url) => {
            const req = await fetch(url);
            if(!req.ok){
                throw new Error(`Could not fetch ${req.url}, status ${req.status}`)
            }
            return await req.json();
        }
   
        getFetchFunction('http://localhost:8080/cardFromDb')
           .then(date => {
               console.dir(date);
                date.forEach(({img, altimg, title, descr, price}) => {
                 new MenuItem(img, altimg, title, descr,price, '.menu .container').render();  
               });
           });
}

module.exports = cards;

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 44:0-14 */
/***/ ((module) => {

function modal (){

    const modal = document.querySelector('.modal'),
    batton = document.querySelectorAll('.btn'),
    modelClose = document.querySelector('.modal__close');

function open(){
  modal.style.display ='block';
  document.body.style.overflow = 'hidden';
  clearTimeout(openForTimeModal);
}

batton.forEach(item =>{
  item.addEventListener('click', open);
});

function forCloseModal(){
  modal.style.display ='none';
  document.body.style.overflow = '';
};

function close(){
  modelClose.addEventListener('click', (event)=>{
      forCloseModal();
      document.addEventListener('keydown', (event)=>{
          if(event.code === "Escape"){
              forCloseModal();
          }
      });
  });
}

modal.addEventListener('click', (event)=>{
  if(event.target === modal){
      forCloseModal();
  }
});

const openForTimeModal = setTimeout(open, 3000);
close();

}

module.exports = modal;

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 46:0-14 */
/***/ ((module) => {

function slider() {
    const sliderItems = document.querySelectorAll('.offer__slide'),
              prev = document.querySelector('.offer__slider-prev'),
              next = document.querySelector('.offer__slider-next');
        let sliderIndex = 1;
        let current = document.querySelector('#current');
        const total = document.querySelector('#total');

        changeSlide(sliderIndex);

        if(sliderItems.length < 10){
            total.textContent = `0${sliderItems.length}`
        }else{
            total.textContent = sliderItems.length
        }
        
        function changeSlide(n){
            if(n > sliderItems.length){
                sliderIndex = 1
            } 
            if(n < 1){
                sliderIndex = sliderItems.length;
            }
            sliderItems.forEach(item => item.style.display = 'none');
            sliderItems[sliderIndex-1].style.display = 'block';

            if(sliderItems.length < 10){
                current.textContent = `0${sliderIndex}`;
            }else{
                current.textContent = sliderIndex;
            }
        }

        function plusSlide(n){
            changeSlide(sliderIndex+=n);
        }

        prev.addEventListener('click', () =>{
            plusSlide(-1);
        });
        next.addEventListener('click', () =>{
            plusSlide(1)
        })
}

module.exports = slider;

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 40:0-14 */
/***/ ((module) => {

function tabs(){
    const parentTab = document.querySelector('.tabheader__items'),
    tabs = document.querySelectorAll('.tabheader__item'),
    content = document.querySelectorAll('.tabcontent');



function hideContent(){
   content.forEach(item =>{
       item.style.display = 'none';
   });

   tabs.forEach(item =>{
       item.classList.remove('tabheader__item_active');
   });
}

function showContentById(i = 0){
   content[i].style.display = 'block';
   tabs[i].classList.add('tabheader__item_active');
}

hideContent();
showContentById();

parentTab.addEventListener('click', (event) =>{
   const target = event.target;

   if(target && target.classList.contains('tabheader__item')){
       tabs.forEach((item, i) =>{
           if(target === item){
               hideContent();
               showContentById(i);
           }
       });
   }
});
}

module.exports = tabs;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: __webpack_require__ */

window.addEventListener('DOMContentLoaded', ()=>{
  
    const calc = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js"),
          cards = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js"),
          modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js"),
          slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js"),
          tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");

    calc();
    cards();
    modal();
    slider();
    tabs();

    });
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map