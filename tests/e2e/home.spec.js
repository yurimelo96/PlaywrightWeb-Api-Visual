const { test, expect} = require('../utils');


    test('CT01-Testar a existência dos principais elementos da página principal da Wikipedia.', async ({ page }) => {
      await page.home.visit() 
      await page.home.validateElements();
      const tituloEsperado = "The Free Encyclopedia"
      const textoFooterEsperado = "This page is available under the Creative Commons Attribution-ShareAlike License"
      const textoLangListEsperado = "Read Wikipedia in your language "
      await page.home.validateTexts(tituloEsperado,textoFooterEsperado,textoLangListEsperado);
      
      
    });

    test('CT02-Buscar por "Brasil" e testar a existência dos principais blocos de conteúdo da página resultante.', async ({ page }) => {
      await page.home.visit() 
      const textoBusca = "Brasil"
      await page.home.inputSearch(textoBusca);
      await page.home.validateSearch();
    });