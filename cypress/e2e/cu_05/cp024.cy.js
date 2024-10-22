describe('Caso de Uso 5 - Modificación de Siembra en una Parcela', () => {

  // Generar datos de prueba con valores realistas para Pairwise Testing
  const timestamp = Date.now(); // Generar timestamp para unicidad en la técnica de siembra
  const combinacionesDeDatos = [
    { cantidadPlantas: '2001', tecnica: `Siembra directa ${timestamp} Modificado` },
    { cantidadPlantas: '2500', tecnica: `Trasplante ${timestamp} Modificado` },
    { cantidadPlantas: '3000', tecnica: `Siembra asistida ${timestamp} Modificado` },
  ];

  combinacionesDeDatos.forEach((datos, index) => {
    it(`Modificar una siembra existente en una parcela - Iteración ${index + 1}`, () => {

      // 1. Inicio de sesión
      cy.visit('https://vino-costero-frontend-st-349319288826.us-central1.run.app/login');
      cy.get('#login_usuario').type('admin');
      cy.get('#login_contrasena').type('1234');
      cy.get('.ant-btn').click();

      // 2. Acceso al módulo de gestión de siembras
      cy.get(':nth-child(2) > .ant-card > .ant-card-body > .ant-btn > span').click();
      cy.get(':nth-child(4) > .ant-card > .ant-card-body > .ant-btn > span').click();

      // 3. Seleccionar una siembra existente para modificar
      cy.get('[data-row-key="44"] > :nth-child(5) > .anticon > svg').click(); // Selector para editar la siembra

      // 4. Seleccionar cualquier fecha de plantación disponible
      cy.get('#create-sowing_fecha_plantacion').click();
      cy.get('.ant-picker-cell-inner').first().click(); // Seleccionar la primera fecha disponible

      // 5. Modificar la cantidad de plantas sembradas
      cy.get('#create-sowing_cantidad_plantas').clear().type(datos.cantidadPlantas);

      // 6. Modificar la técnica de siembra
      cy.get('#create-sowing_tecnica_siembra').clear().type(datos.tecnica);

      // 7. Guardar la modificación de la siembra
      cy.get('.ant-btn').click();

      // 8. Verificar la notificación de éxito
      cy.get('.ant-message-custom-content > :nth-child(2)').should('have.text', 'Siembra actualizada exitosamente');

    });
  });

});
