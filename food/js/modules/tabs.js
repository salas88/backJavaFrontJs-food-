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