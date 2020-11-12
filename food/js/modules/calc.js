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