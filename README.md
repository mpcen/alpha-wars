# Kiko Alpha Wars Image Processing Scripts

## Sup, these were some scripts I wrote to extract words from Kiko's Fortune Cookies. There are also all of Kiko's tweets in JSON that I got. Those scripts aren't in here though. Maybe later

## How it works
1. Fetch the metadata to get the token jpg url
2. Download the image locally

![1](/docs/1.png)

3. Process the image:
    - rotate it 15 degrees
    - convert it to greyscale for cleaner processing
    - trim height and width

![1](/docs/2.png)

4. Save the processed image locally
5. Run the processed image through OCR to get the text.
6. Save the text as json

`
    {
        "tokenId": 1,
        "message": "When Andrew dances like a toad, a sentient bitcoin will acquire the blockchain while spamming your wallet!",
        "wordCount": 17,
        "containsSeedWord": true,
        "cookieType": "Fortune"
    }
`


## To Run:
- `npm install`
- `node src/index.js`

## Tech
- node
- tesseract OCR
- axios
- sharp