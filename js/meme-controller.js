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

function renderGallery(str = '') {
    var elGallery = document.querySelector('.gallery');
    var imgs = setFilter(str);
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
        gCtx.lineWidth = '2';
        gCtx.font = `${memeText.size}px ${memeText.font}`;
        gCtx.textAlign = memeText.align;
        gCtx.strokeStyle = memeText.stroke;
        var x;
        if (memeText.align === 'left') x = 10;
        else if (memeText.align === 'center') x = gCanvas.width / 2;
        else x = gCanvas.width - 10;
        gCtx.strokeText(memeText.txt, x, 40 + memeText.height);
        gCtx.fillStyle = memeText.color;
        gCtx.fillText(memeText.txt, x, 40 + memeText.height);
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
    const currLineIdx = getLineIdx();
    const memeText = currMeme.lines[currLineIdx].txt;
    var elLineInput = document.querySelector('.line-text');
    elLineInput.value = '';
    elLineInput.placeholder = memeText;
    const elSelect = document.querySelector('.font-select');
    elSelect.value = currMeme.lines[currLineIdx].font;
    const elColorInput = document.querySelector('#color');
    elColorInput.value = currMeme.lines[currLineIdx].color;
    const elStrokeInput = document.querySelector('#strokeColor');
    elStrokeInput.value = currMeme.lines[currLineIdx].stroke;
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

function onSetFilter(str) {
    return setFilter(str);
}

function onAlign(align) {
    setAlign(align);
    const currImgId = getCurrMemeIdx();
    renderCanvas(currImgId);
}

function onChangeFont(font) {
    changeFont(font);
    const currImgId = getCurrMemeIdx();
    renderCanvas(currImgId);
}

function onChangeColor(color) {
    changeColor(color);
    const currImgId = getCurrMemeIdx();
    renderCanvas(currImgId);
}

function onChangeStroke(color) {
    changeStroke(color);
    const currImgId = getCurrMemeIdx();
    renderCanvas(currImgId);
}

function onDownloadMeme(elLink) {
    var imgContent = gCanvas.toDataURL('image/jpeg');
    elLink.download = 'new-meme'
    elLink.href = imgContent
}

function uploadImg(elForm, ev) {
    ev.preventDefault();
    gCanvas.toDataURL("image/jpeg");

    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        uploadedImgUrl = encodeURIComponent(uploadedImgUrl);
        var elLink = document.querySelector('.share-container').innerHTML = `
        <a class="btn" href="https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
           Share   
        </a>`;
    }

    doUploadImg(elForm, onSuccess);
}

function doUploadImg(elForm, onSuccess) {
    var formData = new FormData(elForm);
    fetch('http://ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
        .then(function (res) {
            return res.text();
        })
        .then(onSuccess)
        .catch(function (err) {
            console.error(err);
        });
}

