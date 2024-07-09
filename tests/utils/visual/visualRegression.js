const fs = require('fs-extra');
const path = require('path');
const pixelmatch = require('pixelmatch');
const { PNG } = require('pngjs');

async function compareScreenshots({ actual, expected, diff }) {
  const img1 = PNG.sync.read(fs.readFileSync(actual));
  const img2 = PNG.sync.read(fs.readFileSync(expected));
  
  // Verificar se as imagens têm o mesmo tamanho
  if (img1.width !== img2.width || img1.height !== img2.height) {
    console.log(`Actual image dimensions: ${img1.width}x${img1.height}`);
    console.log(`Expected image dimensions: ${img2.width}x${img2.height}`);
    throw new Error('Image sizes do not match.');
  }

  const { width, height } = img1;
  const diffImg = new PNG({ width, height });

  const numDiffPixels = pixelmatch(img1.data, img2.data, diffImg.data, width, height, { threshold: 0.1 });

  fs.writeFileSync(diff, PNG.sync.write(diffImg));
  return numDiffPixels;
}

module.exports = { compareScreenshots };
