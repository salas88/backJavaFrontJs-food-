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