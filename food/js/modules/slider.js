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