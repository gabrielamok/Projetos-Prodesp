// tests/secom.spec.js
const { test, expect } = require('@playwright/test');
const { format } = require('date-fns'); // Para formatar a data e hora

test.describe('Testes da página SECOM', () => {
  test.beforeEach(async ({ page }) => {
    // Navegar até a página antes de cada teste
    await page.goto('https://comunicacao.sp.gov.br/secom');
  });

  test('Validar banners', async ({ page }) => {
    const banners = [
      'https://admin.sggd.sp.gov.br/dx/api/dam/v1/collections/151bdaf6-10ed-44fa-b7bf-f54abafa243d/items/4d257e3c-41a0-44fd-b0e9-d5ea5476c39c/renditions/0894da1e-1e47-466d-99ad-5e851d901d5d?binary=true',
      'https://admin.sggd.sp.gov.br/dx/api/dam/v1/collections/151bdaf6-10ed-44fa-b7bf-f54abafa243d/items/afd78e10-8b68-46db-8bfa-ded51d9693db/renditions/10f65cb0-a243-4f81-8468-1cbdc309826c?binary=true'
    ];

    for (const banner of banners) {
      const bannerElement = await page.$(`img[src="${banner}"]`);
      expect(bannerElement).not.toBeNull();
    }

    // Screenshot dos banners
    const timestamp = format(new Date(), 'yyyy-MM-dd_HH-mm-ss');
    await page.screenshot({ path: `screenshots/banners_${timestamp}.png`, fullPage: true });
  });

  test('Validar cards', async ({ page }) => {
    const card = await page.$('.card');
    expect(card).not.toBeNull();

    const cardTitle = await card.$('h5');
    expect(await cardTitle.innerText()).toBe('Jornalistas');

    const cardText = await card.$('p');
    expect(await cardText.innerText()).toBe('Canais de Atendimento à Imprensa');

    // Screenshot dos cards
    const timestamp = format(new Date(), 'yyyy-MM-dd_HH-mm-ss');
    await page.screenshot({ path: `screenshots/cards_${timestamp}.png`, fullPage: true });
  });

  test('Validar destaques de notícias', async ({ page }) => {
    const newsImage = await page.$('img[src*="/wcm/connect/503c9fc7-381c-4647-8bad-4a88a29ed7e9/54326364697_72606e5e22_k-1024x683.jpg"]');
    expect(newsImage).not.toBeNull();

    // Screenshot dos destaques de notícias
    const timestamp = format(new Date(), 'yyyy-MM-dd_HH-mm-ss');
    await page.screenshot({ path: `screenshots/destaques_${timestamp}.png`, fullPage: true });
  });

  test('Gerar printscreen completo da página', async ({ page }) => {
    // Screenshot completo da página
    const timestamp = format(new Date(), 'yyyy-MM-dd_HH-mm-ss');
    await page.screenshot({ path: `screenshots/fullpage_${timestamp}.png`, fullPage: true });
  });
});