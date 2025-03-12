// playwright.config.js
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests', // Pasta onde estão os testes
  timeout: 30 * 1000, // Timeout global para os testes
  retries: 1, // Número de tentativas em caso de falha
  use: {
    headless: false, // Executar em modo headless ou não
    viewport: { width: 1280, height: 720 }, // Tamanho da janela do navegador
    screenshot: 'only-on-failure', // Tirar screenshots apenas em caso de falha
  },
});