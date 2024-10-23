describe('Caso de Uso 3 - Creación de Control de Tierra', () => {

  const combinacionesDeDatos = [
    // Iteración 1: Valores fuera de rango para control de tierra
    { 
      ph: '15', // PH fuera de rango
      humedad: '150', // Humedad mayor al 100%
      temperatura: '200', // Temperatura muy alta
      observaciones: 'Valores fuera de rango',
      esValido: false
    },
    // Iteración 2: Campos faltantes (dejan campos vacíos)
    { 
      ph: '', // PH vacío
      humedad: '', // Humedad vacía
      temperatura: '', // Temperatura vacía
      observaciones: '', // Observaciones vacías
      esValido: false
    },
    // Iteración 3: Combinación válida (de control)
    { 
      ph: '6.5', 
      humedad: '70', 
      temperatura: '22', 
      observaciones: 'Condiciones normales',
      esValido: true
    }
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

      // 3. Seleccionar la primera parcela para crear un nuevo control de tierra
      cy.get('.ant-table-row').first().find(':nth-child(5) > .anticon > svg').click(); // Selector para crear un control de tierra

      // 4. Rellenar el formulario de control de tierra con valores de la iteración actual
      if (datos.ph) cy.get('#register-soil-control_ph').clear().type(datos.ph);
      if (datos.humedad) cy.get('#register-soil-control_humedad').clear().type(datos.humedad);
      if (datos.temperatura) cy.get('#register-soil-control_temperatura').clear().type(datos.temperatura);
      if (datos.observaciones) cy.get('#register-soil-control_observaciones').clear().type(datos.observaciones);

      // 5. Guardar el nuevo control de tierra
      cy.get('.ant-btn').click();

      // 6. Verificar la notificación de éxito o error
      if (datos.esValido) {
        cy.get('.ant-message-custom-content > :nth-child(2)').should('have.text', 'El control de tierra ha sido registrado exitosamente');
      } else {
        cy.get('.ant-message-custom-content > :nth-child(2)').should('have.text', 'Error al registrar el control de tierra');
      }
    });
  });

});
