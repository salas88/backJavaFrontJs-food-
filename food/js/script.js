
window.addEventListener('DOMContentLoaded', ()=>{
  
    const calc = require('./modules/calc'),
          cards = require('./modules/cards'),
          modal = require('./modules/modal'),
          slider = require('./modules/slider'),
          tabs = require('./modules/tabs');

    calc();
    cards();
    modal();
    slider();
    tabs();

    });