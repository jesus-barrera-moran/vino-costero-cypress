describe('Caso de Uso 3 - Creación de Control de Tierra', () => {

  // Generar datos de prueba con valores realistas para Pairwise Testing
  const combinacionesDeDatos = [
    { ph: '5', humedad: '35', temperatura: '40', observaciones: 'Control inicial' },
    { ph: '6', humedad: '45', temperatura: '30', observaciones: 'Condiciones normales' },
    { ph: '7', humedad: '50', temperatura: '25', observaciones: 'Nivel óptimo de humedad' },
  ];

  combinacionesDeDatos.forEach((datos, index) => {
    it(`Crear un nuevo control de tierra - Iteración ${index + 1}`, () => {

      // 1. Inicio de sesión
      cy.visit('https://vino-costero-frontend-st-349319288826.us-central1.run.app/login');
      cy.get('#login_usuario').type('admin');
      cy.get('#login_contrasena').type('1234');
      cy.get('.ant-btn').click();

      // 2. Acceso al módulo de controles de tierra
      cy.get(':nth-child(2) > .ant-card > .ant-card-body > .ant-btn > span').click(); // Acceder a "Gestión de Parcelas"
      cy.get(':nth-child(1) > .ant-card > .ant-card-body > .ant-btn > span').click(); // Acceder a "Controles de Tierra"

      // 3. Seleccionar una parcela existente para crear un nuevo control de tierra
      cy.get('[data-row-key="38"] > :nth-child(5) > .anticon > svg').click(); // Selector para crear un control de tierra

      // 4. Rellenar el formulario de control de tierra con valores de la iteración actual
      cy.get('#register-soil-control_ph').clear().type(datos.ph);
      cy.get('#register-soil-control_humedad').clear().type(datos.humedad);
      cy.get('#register-soil-control_temperatura').clear().type(datos.temperatura);
      cy.get('#register-soil-control_observaciones').clear().type(datos.observaciones);

      // 5. Guardar el nuevo control de tierra
      cy.get('.ant-btn').click();

      // 6. Verificar la notificación de éxito
      cy.get('.ant-message-custom-content > :nth-child(2)').should('have.text', 'El control de tierra ha sido registrado exitosamente');

    });
  });

});
