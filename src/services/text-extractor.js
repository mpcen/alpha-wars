const axios = require('axios');
const Path = require('path');
const tesseract = require('node-tesseract-ocr');

const extractText = async (SeedWords, metadata_baseUrl, totalTokens) => {
    const ocrConfig = {
        lang: "eng",
        oem: 1,
        psm: 3,
    };
    const messages = [];

    for(let i = 0; i < totalTokens; i++) {
        const metadataResponse = await axios.get(`${metadata_baseUrl}/${i}`);
        const path = Path.resolve(__dirname, '../', 'images', 'mutated-images', `${i}.png`);
        const fortuneText = await tesseract.recognize(path, ocrConfig);
        const normalizedText = fortuneText.replaceAll('\n', ' ').replaceAll('\f', '').trim();
        const wordCount = normalizedText.length ? normalizedText.split(' ').length : 0;
        let seedWordFound = false;

        for(const word of normalizedText.split(' ')) {
            if(SeedWords.has(word.toLowerCase())) {
                seedWordFound = true;
            }
        }

        const cookieType = metadataResponse.data.attributes[0].value.split(' ')[0];

        messages.push({
            tokenId: i,
            message: normalizedText,
            wordCount,
            containsSeedWord: seedWordFound,
            cookieType
        });

        console.log('Processed text for', i);
    }

    return messages;
}

const textExtrator = {
    extractText
};

module.exports = { textExtrator };