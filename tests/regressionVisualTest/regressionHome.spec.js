const { test, expect } = require('@playwright/test');
const fs = require('fs-extra');
const path = require('path');
const { PNG } = require('pngjs');
const sharp = require('sharp'); // Biblioteca para redimensionar imagens
const { compareScreenshots } = require('../utils/visual/visualRegression');

test.use({ viewport: { width: 1280, height: 720 } });

test.describe('Visual Regression Test', () => {
  test('Homepage visual test', async ({ page }, testInfo) => {
    await page.goto('https://www.wikipedia.org/');
    
    const screenshotPath = path.resolve(__dirname, 'screenshots', 'homepage.png');
    const diffPath = path.resolve(__dirname, 'screenshots', 'homepage-diff.png');
    const baselinePath = path.resolve(__dirname, 'baseline', 'homepage.png');
    const tempBaselinePath = path.resolve(__dirname, 'baseline', 'temp-homepage.png'); // Caminho temporário

    // Validando se os diretórios existem
    fs.ensureDirSync(path.dirname(screenshotPath));
    fs.ensureDirSync(path.dirname(diffPath));
    fs.ensureDirSync(path.dirname(baselinePath));

    // Definindo o tamanho do viewport
    await page.setViewportSize({ width: 1280, height: 720 });

    // Capturar a imagem atual
    await page.screenshot({ path: screenshotPath });

    // Anexar a captura de tela atual ao relatório
    await testInfo.attach('screenshot', { path: screenshotPath, contentType: 'image/png' });

    // Verificar se a imagem de referência já existe
    if (!fs.existsSync(baselinePath)) {
      throw new Error(`Baseline image does not exist at ${baselinePath}. Please upload the baseline image before running the test.`);
    }

    // Redimensionar a imagem de referência para garantir que tenha o mesmo tamanho que a captura de tela atual
    const actualImage = PNG.sync.read(fs.readFileSync(screenshotPath));
    const baselineImage = PNG.sync.read(fs.readFileSync(baselinePath));

    if (baselineImage.width !== actualImage.width || baselineImage.height !== actualImage.height) {
      await sharp(baselinePath)
        .resize(actualImage.width, actualImage.height)
        .toFile(tempBaselinePath);

      fs.renameSync(tempBaselinePath, baselinePath);
    }

    // Comparar a captura de tela atual com a imagem de referência
    const numDiffPixels = await compareScreenshots({
      actual: screenshotPath,
      expected: baselinePath,
      diff: diffPath,
    });

    // Anexar a captura de tela de referência e a imagem de diferença ao relatório
    await testInfo.attach('baseline', { path: baselinePath, contentType: 'image/png' });
    if (numDiffPixels > 0) {
      await testInfo.attach('diff', { path: diffPath, contentType: 'image/png' });
    }

    // Verificar se há diferenças e falhar o teste se houver
    expect(numDiffPixels).toBe(0, `Visual regression detected.`);
  });
});
