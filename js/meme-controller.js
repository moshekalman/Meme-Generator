'use strict';

var gSavedMemes = getSavedMemes();

var gCanvas;
var gCtx;

function init() {
    gCanvas = document.querySelector('#my-canvas');
    gCtx = gCanvas.getContext('2d');
    renderGallery();
    const currMeme = getMeme();
    var memeText = currMeme.lines[getLineIdx()].txt;
    var elLineInput = document.querySelector('.line-text');
    elLineInput.value = '';
    elLineInput.placeholder = memeText;
    renderSavedGallery();
}

function renderSavedGallery() {
    var elGallery = document.querySelector('.archive');
    var strHTML = '';
    gSavedMemes.forEach(meme => {
        strHTML += `<img src="${meme}">`;
    });

    elGallery.innerHTML = strHTML;
}

function renderGallery() {
    var elGallery = document.querySelector('.gallery');
    var imgs = getImgs();
    var strHTML = '';
    imgs.forEach(img => {
        strHTML += `<img onclick="renderCanvas(${img.id}); openEditor()" src="${img.url}">`;
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
    changeLineHeight(diff);
    const currImgId = getCurrMemeIdx();
    renderCanvas(currImgId);
}

function onSwitchLines() {
    switchLines();
    const currMeme = getMeme();
    var memeText = currMeme.lines[getLineIdx()].txt;
    var elLineInput = document.querySelector('.line-text');
    elLineInput.value = '';
    elLineInput.placeholder = memeText;
}

function openGallery() {
    const elGallery = document.querySelector('.meme-gallery');
    elGallery.classList.remove('hide');
    const elEditor = document.querySelector('.meme-editor');
    elEditor.classList.remove('show');
    const elArchive = document.querySelector('.saved-memes');
    elEditor.classList.remove('show');

    const elGalleryLi = document.querySelector('.gallery-link');
    elGalleryLi.classList.add('checked');
    const elEditorLi = document.querySelector('.editor-link');
    elEditorLi.classList.remove('checked');
    const elArchiveLi = document.querySelector('.archive-link');
    elArchiveLi.classList.remove('checked');

}

function openEditor() {
    const elGallery = document.querySelector('.meme-gallery');
    elGallery.classList.add('hide');
    const elEditor = document.querySelector('.meme-editor');
    elEditor.classList.add('show');
    const elArchive = document.querySelector('.saved-memes');
    elArchive.classList.remove('show');

    const elGalleryLi = document.querySelector('.gallery-link');
    elGalleryLi.classList.remove('checked');
    const elEditorLi = document.querySelector('.editor-link');
    elEditorLi.classList.add('checked');
    const elArchiveLi = document.querySelector('.archive-link');
    elArchiveLi.classList.remove('checked');

}

function openArchive() {
    const elGallery = document.querySelector('.meme-gallery');
    elGallery.classList.add('hide');
    const elEditor = document.querySelector('.meme-editor');
    elEditor.classList.remove('show');
    const elArchive = document.querySelector('.saved-memes');
    elArchive.classList.add('show');

    const elGalleryLi = document.querySelector('.gallery-link');
    elGalleryLi.classList.remove('checked');
    const elEditorLi = document.querySelector('.editor-link');
    elEditorLi.classList.remove('checked');
    const elArchiveLi = document.querySelector('.archive-link');
    elArchiveLi.classList.add('checked');
}

function onSaveMeme() {
    const meme = gCanvas.toDataURL();
    gSavedMemes.push(meme);
    saveMemes(gSavedMemes);
    renderSavedGallery();
}

function onAddLine() {
    addLine();
    const currImgId = getCurrMemeIdx();
    renderCanvas(currImgId);
}

function onDeleteLine() {
    deleteLine();
    const currImgId = getCurrMemeIdx();
    renderCanvas(currImgId);
}

function onCanvasClick(ev) {
    var currMeme = getMeme();
    const X = ev.offsetX;
    const Y = ev.offsetY;
}