const { defineConfig } = require("cypress");

module.exports = defineConfig({
  video: true, // habilita la grabación de video
  videoCompression: 32, // comprime el video para ahorrar espacio (0 para deshabilitar la compresión)
  videoUploadOnPasses: true, // sube videos cuando las pruebas pasan
  videosFolder: 'cypress/videos', // ruta para almacenar los videos
  defaultCommandTimeout: 8000, // tiempo de espera predeterminado
  experimentalStudio: true, // Activar Cypress Studio
  e2e: {
    baseUrl: 'https://vino-costero-frontend-st-349319288826.us-central1.run.app/login',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
