'use strict';

var gCanvas;
var gCtx;

function init() {
    gCanvas = document.querySelector('#my-canvas');
    gCtx = gCanvas.getContext('2d');
    renderGallery();
}

function renderGallery() {
    var elGallery = document.querySelector('.gallery');
    var imgs = getImgs();
    var strHTML = '';
    imgs.forEach(img => {
        strHTML += `<img onclick="renderCanvas(${img.id})" src="${img.url}">`;
    });

    elGallery.innerHTML = strHTML;
}

function renderCanvas(imgId) {
    const currImg = getImgById(imgId);
    var img = new Image();
    img.src = currImg.url;
    console.log(img);
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
    drawText();
}

function drawText() {
    const currMeme = getMeme();
    var memeText = currMeme.lines[0];
    gCtx.font = `${memeText.size}px ${memeText.font}`;
    gCtx.textAlign = memeText.align;
    gCtx.strokeStyle = 'white';
    gCtx.strokeText(memeText.txt, 225, memeText.size);
    gCtx.fillStyle = 'black';
    gCtx.fillText(memeText.txt, 225, memeText.size);
}

function onNewText(txt) {
    changeMemeText(txt);
    const currImgId = getCurrMemeIdx();
    renderCanvas(currImgId);
}