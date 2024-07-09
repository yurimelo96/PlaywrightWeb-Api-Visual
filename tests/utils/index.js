const {test: base, expect} = require('@playwright/test')

const { HomePage } = require('./web/actions/Home');

const test = base.extend({
    page: async ({page}, use) => {
        await use({
            ...page,
            home: new HomePage(page)
        })
    }
})

export { test, expect }