const { test, expect } = require('@playwright/test');

test.describe('Проверка ПК версии (1280px)', () => {


    test.beforeEach(async ({ page }) => {
        const response = await page.goto('https://polis812.github.io/vacuu/');
        expect(response.status()).toBe(200);
        await page.setViewportSize({ width: 1280, height: 800 });
    });


    test('Проверка ссылки "Blog"', async ({ page }) => {
        await page.waitForSelector('.main a:has-text("Blog")');
        const blogLink = await page.locator('.main a:has-text("Blog")');
        await expect(blogLink).toHaveAttribute('href', 'https://polis812.github.io/blog');
    });


    test('Проверка ссылки "Calculate the price" для "Car insurance"', async ({ page }) => {
        const calculatePriceLink = await page.locator('.insurance__title:has-text("Car insurance") a:has-text("Calculate the price")');
        await expect(calculatePriceLink).toHaveAttribute('href', 'https://polis812.github.io/car');
    });

    test('Проверка отзывов и стрелок', async ({ page }) => {
        const reviewsList = await page.locator('.reviews__list');
        const arrowsLeft = await page.locator('.arrow-left');
        const arrowsRight = await page.locator('.arrow-right');

        const reviewsCount = await reviewsList.locator('.review').count();

        if (reviewsCount > 3) {
            await expect(arrowsLeft).not.toHaveClass(/arrow-disabled/);
            await expect(arrowsRight).not.toHaveClass(/arrow-disabled/);
        } else {
            await expect(arrowsLeft).toHaveClass(/arrow-disabled/);
            await expect(arrowsRight).toHaveClass(/arrow-disabled/);
        }
    });

    test('Проверка ссылки "Travel insurance" в футере', async ({ page }) => {
        const travelInsuranceLink = await page.locator('.footer__col__title:has-text("Product") a:has-text("Travel insurance")');
        await expect(travelInsuranceLink).toHaveAttribute('href', 'https://polis812.github.io/travel');
    });

    test('Проверка ссылки логотипа', async ({ page }) => {
        const logoLink = await page.locator('.logo').first();
        await expect(logoLink).toHaveAttribute('href', 'https://polis812.github.io/vacuu/');        
    });

    test('Проверка ссылки "Terms"', async ({ page }) => {
        const termsLink = await page.locator('.footer__link:has-text("Terms")');
        await expect(termsLink).toHaveAttribute('href', 'https://polis812.github.io/terms');
    });
});

test.describe('Проверка мобильной версии (320px)', () => {
    test.beforeEach(async ({ page }) => {
        const response = await page.goto('https://polis812.github.io/vacuu/');
        expect(response.status()).toBe(200);
        await page.setViewportSize({ width: 320, height: 800 });
    });

    test('Проверка ширины блоков .insurance', async ({ page }) => {
        const insuranceBlocks = await page.locator('.insurance');
        const insuranceCount = await insuranceBlocks.count();

        for (let i = 0; i < insuranceCount; i++) {
            const width = await insuranceBlocks.nth(i).evaluate(el => el.offsetWidth);
            expect(width).toBe(320);
        }
    });

    test('Проверка ссылки "Calculate the price" для "Car insurance"', async ({ page }) => {
        const calculatePriceLink = await page.locator('.insurance__title:has-text("Car insurance") a:has-text("Calculate the price")');
        await expect(calculatePriceLink).toHaveAttribute('href', 'https://polis812.github.io/car');
    });

    test('Проверка кнопок .reviews__actions', async ({ page }) => {
        const reviewsActions = await page.locator('.reviews__actions');
        const leftArrow = await reviewsActions.locator('.arrow-left');
        const rightArrow = await reviewsActions.locator('.arrow-right');

        await leftArrow.click();

        await rightArrow.click();
    });

    test('Проверка ссылки "Travel insurance" в футере', async ({ page }) => {
        const travelInsuranceLink = await page.locator('.footer__col__title:has-text("Product") a:has-text("Travel insurance")');
        await expect(travelInsuranceLink).toHaveAttribute('href', 'https://polis812.github.io/travel');
    });

    test('Проверка ссылки логотипа', async ({ page }) => {
        const logoLink = await page.locator('.logo');
        await expect(logoLink).toHaveAttribute('href', 'https://polis812.github.io/vacuu/');
    });

    test('Проверка ссылки "Terms"', async ({ page }) => {
        const termsLink = await page.locator('.footer__link:has-text("Terms")');
        await expect(termsLink).toHaveAttribute('href', 'https://polis812.github.io/terms');
    });
});

