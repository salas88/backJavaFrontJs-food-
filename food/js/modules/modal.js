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