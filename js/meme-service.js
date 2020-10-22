'use strict';

const SAVED_MEMES = 'savedMemesDB';

// var gKeywords = { 'happy': 12, 'funny puk': 1 };
var gImgs = _createImgs();
var gCurrLineIdx = 0;
var gMeme = {
    selectedImgId: null,
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
            height: 330
        }
    ]
};

function _createImgs() {
    var imgs = [];
    for (let i = 0; i < 18; i++) {
        const img = { id: i + 1, url: `meme-imgs/${i + 1}.jpg` };
        imgs.push(img);
    }
    return imgs;
}

function _addKeyWords() {
    var keyWords = ['Happy', 'Funny', 'Troll', 'Bamboozeled', 'Pollitics'];
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
    if (gCurrLineIdx + 1 === gMeme.lines.length) gCurrLineIdx = 0;
    else gCurrLineIdx++;
}

function getLineIdx() {
    return gCurrLineIdx;
}

function saveMemes(savedMemes) {
    saveToLocalStorage(SAVED_MEMES, savedMemes);
}

function getSavedMemes() {
    return (LoadFromLocalStorage(SAVED_MEMES)) ? LoadFromLocalStorage(SAVED_MEMES) : [];
}

function deleteLine() {
    if (gMeme.lines.length === 0) return;
    gMeme.lines.splice(gCurrLineIdx, 1);
}

function addLine() {
    gMeme.lines.push({
        txt: 'New Line',
        size: 48,
        align: 'center',
        color: 'red',
        font: 'impact',
        height: 180
    });
}
