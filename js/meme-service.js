'use strict';

// var gKeywords = { 'happy': 12, 'funny puk': 1 };
var gImgs = _createImgs();
var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I never eat Falafel',
            size: 48,
            align: 'center',
            color: 'red',
            font: 'impact'
        }
    ]
};

function _createImgs() {
    var imgs = [];
    for (let i = 0; i < 2; i++) {
        const img = { id: i + 1, url: `meme-imgs/${i + 1}.jpg` };
        imgs.push(img);
    }
    return imgs;
}

function getImgs() {
    return gImgs;
}

function getImgById(id) {
    gMeme.selectedImgId = id;
    return gImgs.find(img => img.id === id);
}

function getMeme() {
    return gMeme;
}

function changeMemeText(txt) {
    gMeme.lines[0].txt = txt;
}

function getCurrMemeIdx(){
    console.log(gMeme)
    return gMeme.selectedImgId;
}
