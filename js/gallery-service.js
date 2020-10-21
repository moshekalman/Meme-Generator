'use strict';

// var gKeywords = { 'happy': 12, 'funny puk': 1 };
var gImgs = _createImgs();
var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I never eat Falafel',
            size: 20,
            align: 'left',
            color: 'red'
        }
    ]
};

function _createImgs() {
    var imgs = [];
    for (let i = 0; i < 18; i++) {
        const img = { id: i+1, url: `meme-imgs/${i+1}.jpg` };
        imgs.push(img);
    }
    return imgs;
}

function getImgs() {
    const imgMap = gImgs.map(img => img.url);
    return imgMap;
}
