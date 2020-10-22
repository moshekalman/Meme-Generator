'use strict';

const SAVED_MEMES = 'savedMemesDB';

var gImgs = [{ id: 1, url: `meme-imgs/1.jpg`, keyWords: ['political'] },
{ id: 2, url: `meme-imgs/2.jpg`, keyWords: ['cute'] },
{ id: 3, url: `meme-imgs/3.jpg`, keyWords: ['cute'] },
{ id: 4, url: `meme-imgs/4.jpg`, keyWords: ['cute'] },
{ id: 5, url: `meme-imgs/5.jpg`, keyWords: ['funny'] },
{ id: 6, url: `meme-imgs/6.jpg`, keyWords: ['funny'] },
{ id: 7, url: `meme-imgs/7.jpg`, keyWords: ['funny', 'bamboozeled'] },
{ id: 8, url: `meme-imgs/8.jpg`, keyWords: ['funny', 'bamboozeled'] },
{ id: 9, url: `meme-imgs/9.jpg`, keyWords: ['troll', 'bamboozeled'] },
{ id: 10, url: `meme-imgs/10.jpg`, keyWords: ['bamboozeled', 'political'] },
{ id: 11, url: `meme-imgs/11.jpg`, keyWords: ['bamboozeled', 'troll'] },
{ id: 12, url: `meme-imgs/12.jpg`, keyWords: ['funny', 'troll'] },
{ id: 13, url: `meme-imgs/13.jpg`, keyWords: ['bamboozeled', 'funny'] },
{ id: 14, url: `meme-imgs/14.jpg`, keyWords: ['funny'] },
{ id: 15, url: `meme-imgs/15.jpg`, keyWords: ['funny'] },
{ id: 16, url: `meme-imgs/16.jpg`, keyWords: ['funny', 'bamboozeled'] },
{ id: 17, url: `meme-imgs/17.jpg`, keyWords: ['political', 'bamboozeled'] },
{ id: 18, url: `meme-imgs/18.jpg`, keyWords: ['cute', 'bamboozeled'] }
];
var gKeywords = ['cute', 'funny', 'troll', 'bamboozeled', 'political'];
var gCurrLineIdx = 0;
var gMeme = {
    selectedImgId: null,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I never eat Falafel',
            size: 40,
            align: 'center',
            color: 'black',
            font: 'impact',
            height: 0
        },
        {
            txt: 'When Im Full',
            size: 40,
            align: 'center',
            color: 'black',
            font: 'impact',
            height: 352
        }
    ]
};

function _createImgs() {
    var imgs = [];
    for (let i = 0; i < 18; i++) {
        const img = { id: i + 1, url: `meme-imgs/${i + 1}.jpg`, keyWords: [] };
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
        size: 40,
        align: 'center',
        color: 'black',
        font: 'impact',
        height: 180
    });
}

function setFilter(str) {
    return gImgs.filter(img => {
        var filtImg = img.keyWords.filter(word => word.includes(str.toLowerCase()));
        if (filtImg[0]) return img;
    });
}

function setAlign(align) {
    gMeme.lines[gCurrLineIdx].align = align;
}

function changeFont(font){
    gMeme.lines[gCurrLineIdx].font = font;
}