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
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
    drawText();
}

function drawText() {
    const currMeme = getMeme();
    var memeTexts = currMeme.lines;
    memeTexts.forEach(memeText => {
        gCtx.lineWidth = '3';
        gCtx.font = `${memeText.size}px ${memeText.font}`;
        gCtx.textAlign = memeText.align;
        gCtx.strokeStyle = 'white';
        var x;
        if (memeText.align === 'left') x = 0;
        else if (memeText.align === 'center') x = gCanvas.width / 2;
        else x = gCanvas.width;
        gCtx.strokeText(memeText.txt, x, memeText.size + memeText.height);
        gCtx.fillStyle = 'black';
        gCtx.fillText(memeText.txt, x, memeText.size + memeText.height);
    });
}

function onNewText(txt) {
    changeMemeText(txt);
    const currImgId = getCurrMemeIdx();
    renderCanvas(currImgId);
}

function onFontSizeChange(diff) {
    changeFontSize(diff);
    const currImgId = getCurrMemeIdx();
    renderCanvas(currImgId);
}

function onLineHeightChange(diff) {
    console.log(diff);
    changeLineHeight(diff);
    const currImgId = getCurrMemeIdx();
    renderCanvas(currImgId);
}

function onSwitchLines() {
    switchLines();
    const currMeme = getMeme();
    var memeText = currMeme.lines[getLineIdx()].txt;
    var elLineInput = document.querySelector('.line-text');
    elLineInput.value = memeText;
}