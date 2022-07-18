const fs = require('fs');

const { SeedWords } = require('./seedwords');
const { imageDownloader } = require('./services/image-downloader');
const { imageMutator } = require('./services/image-mutator');
const { textExtrator } = require('./services/text-extractor');

const delay = async () => new Promise(resolve => setTimeout(resolve, 1000));

const run = async () => {
    const totalTokens = 10000;
    const metadata_baseUrl = 'https://bearmarketbakery.s3.us-east-2.amazonaws.com/fortunecrackers/bobarocks';

    await imageDownloader.downloadImages(metadata_baseUrl, totalTokens);

    await delay();

    await imageMutator.mutateImages(totalTokens, totalTokens);

    await delay();
    
    const messages = await textExtrator.extractText(SeedWords, metadata_baseUrl, totalTokens);

    await delay();

    fs.writeFileSync('./messages.json', JSON.stringify(messages));

    console.log('Done.')
}

run();