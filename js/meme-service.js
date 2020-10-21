'use strict';

// var gKeywords = { 'happy': 12, 'funny puk': 1 };
var gImgs = _createImgs();
var gCurrLineIdx = 0;
var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I never eat Falafel',
            size: 48,
            align: 'center',
            color: 'red',
            font: 'impact',
            height: 0
        },
        {
            txt: 'When Im Full',
            size: 48,
            align: 'center',
            color: 'red',
            font: 'impact',
            height: 380
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
    gMeme.lines[gCurrLineIdx].txt = txt;
}

function getCurrMemeIdx() {
    return gMeme.selectedImgId;
}

function changeFontSize(diff) {
    gMeme.lines[gCurrLineIdx].size += diff;
}

function changeLineHeight(diff) {
    gMeme.lines[gCurrLineIdx].height += diff;
}

function switchLines() {
    gCurrLineIdx = (gCurrLineIdx === 0) ? 1 : 0;
}

function getLineIdx() {
    return gCurrLineIdx;
}
