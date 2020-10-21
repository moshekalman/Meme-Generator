'use strict';

function init() {
    renderGallery();
}

function renderGallery() {
    var elGallery = document.querySelector('.gallery');
    var imgs = getImgs();
    var strHTML = '';
    imgs.forEach(img => {
        strHTML += `<img src="${img}">`;
    });

    elGallery.innerHTML =strHTML;
}