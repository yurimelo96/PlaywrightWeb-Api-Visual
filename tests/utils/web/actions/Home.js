const { expect } = require('@playwright/test');

export class HomePage {

    constructor(page) {
        this.page = page
    }
    async visit() {
        await this.page.goto('https://www.wikipedia.org/');
    }

    async validateElements() {
        await expect(this.page.locator('#searchInput')).toBeEnabled();
        await expect(this.page.locator('.central-textlogo-wrapper')).toBeVisible();
        await expect(this.page.locator('a.link-box')).toHaveCount(10);
        await expect(this.page.locator('i.sprite.svg-search-icon')).toBeVisible();
        await expect(this.page.locator("//span[text()='Commons']")).toBeVisible();
        await expect(this.page.locator("//span[text()='Wikibooks']")).toBeVisible();
        await expect(this.page.locator("//span[text()='Wikiversity']")).toBeVisible();
        await expect(this.page.locator("//span[text()='Wikisource']")).toBeVisible();
        await expect(this.page.locator("//span[text()='Meta-Wiki']")).toBeVisible();
        await expect(this.page.locator("//span[text()='Wikivoyage']")).toBeVisible();
        await expect(this.page.locator("//span[text()='Wikinews']")).toBeVisible();
        await expect(this.page.locator("//span[text()='Wikiquote']")).toBeVisible();
        await expect(this.page.locator("//span[text()='Wikispecies']")).toBeVisible();
        await expect(this.page.locator("//span[text()='Wiktionary']")).toBeVisible();
        await expect(this.page.locator("//span[text()='Wikidata']")).toBeVisible();
        await expect(this.page.locator("//span[text()='MediaWiki']")).toBeVisible();
        await expect(this.page.locator("//span[text()='Wikifunctions']")).toBeVisible();

    }

    async validateTexts(tituloEsperado,textoFooterEsperado,textoLangListEsperado) {
        const tituloObtido = this.page.locator('//strong[@class="jsl10n localized-slogan"]')
        await expect(tituloObtido).toContainText(tituloEsperado);
        const footerLicense = this.page.locator('//p[@class="site-license"]//small[1]')
        await expect(footerLicense).toContainText(textoFooterEsperado);
        const textLangList = this.page.locator('span.lang-list-button-text.jsl10n')
        await expect(textLangList).toContainText(textoLangListEsperado);
    }

    async inputSearch(textoBusca) {
        await this.page.locator("//input[@type='search']").fill(textoBusca)
        await this.page.locator("//button[@type='submit']//i[1]").click()
        await this.page.waitForNavigation();
    }

    async validateSearch() {
        await expect(this.page.url()).toContain('/wiki/Brazil');
        await expect(this.page.locator('header.vector-header.mw-header')).toBeVisible();
        await expect(this.page.locator('#firstHeading')).toContainText('Brazil');
        await expect(this.page.locator('.infobox')).toBeVisible();
        await expect(this.page.locator('#centralNotice')).toBeVisible();
        await expect(this.page.getByLabel('Brazil', { exact: true })).toBeVisible();
        await expect(this.page.locator('#vector-appearance')).toBeVisible();
    }
}
