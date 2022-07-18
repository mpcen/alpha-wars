const Path = require('path');
const sharp = require('sharp');

// Mutate images to prepare text parsing

const mutateImages = async (totalTokens) => {
    for(let i = 0; i < totalTokens; i++) {
        const sourcePath = Path.resolve(__dirname, '../', 'images', 'original-images', `${i}.png`);
        const destPath = Path.resolve(__dirname, '../', 'images', 'mutated-images', `${i}.png`);

        sharp(sourcePath)
            .rotate(15)
            .extract({ left: 170, top: 550, width: 950, height: 230 })
            .greyscale()
            .toFile(destPath)

        console.log(`Mutated ${i}.png`);
    }
}

const imageMutator = { mutateImages };

module.exports = { imageMutator };