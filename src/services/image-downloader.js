const axios = require('axios');
const Path = require('path');
const Fs = require('fs');

// Download and store original-images

const downloadImages = async (metadata_baseUrl, totalTokens) => {
    for (let i = 0; i < totalTokens; i++) {
        const metadataResponse = await axios.get(`${metadata_baseUrl}/${i}`);
        const imageUrl = metadataResponse.data.image;
        const imageStreamResponse = await axios.get(imageUrl, {
            responseType: 'stream'
        });
        const path = Path.resolve(__dirname, '../', 'images', 'original-images', `${i}.png`);
        const writer = Fs.createWriteStream(path);

        imageStreamResponse.data.pipe(writer);

        console.log(`Saved ${path}`);
    }
}

const imageDownloader = { downloadImages };

module.exports = { imageDownloader };