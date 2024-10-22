describe('Caso de Uso 4 - Modificación de un Tipo de Uva', () => {

  // Generar datos de prueba con valores realistas para Pairwise Testing
  const timestamp = Date.now(); // Generar timestamp para unicidad
  const combinacionesDeDatos = [
    { nombre: `Cabernet Sauvignon Modificado ${timestamp}`, ph: '6', humedad: '26', temperatura: '36', tiempoCosecha: '160', descripcion: 'Modificación de Cabernet Sauvignon' },
    { nombre: `Merlot Modificado ${timestamp}`, ph: '5', humedad: '27', temperatura: '32', tiempoCosecha: '140', descripcion: 'Modificación de Merlot' },
    { nombre: `Syrah Modificado ${timestamp}`, ph: '7', humedad: '28', temperatura: '38', tiempoCosecha: '180', descripcion: 'Modificación de Syrah' },
  ];

  combinacionesDeDatos.forEach((datos, index) => {
    it(`Modificar un tipo de uva existente - Iteración ${index + 1}`, () => {

      // 1. Inicio de sesión
      cy.visit('https://vino-costero-frontend-st-349319288826.us-central1.run.app/login');
      cy.get('#login_usuario').type('admin');
      cy.get('#login_contrasena').type('1234');
      cy.get('.ant-btn').click();

      // 2. Acceso al módulo de gestión de tipos de uvas
      cy.get(':nth-child(2) > .ant-card > .ant-card-body > .ant-btn > span').click(); // Acceder a "Gestión de Parcelas"
      cy.get(':nth-child(5) > .ant-card > .ant-card-body > .ant-btn > span').click(); // Acceder a "Gestión de Tipos de Uvas"

      // 3. Seleccionar un tipo de uva existente para modificar
      cy.get('[data-row-key="30"] > :nth-child(5) > .anticon > svg').click(); // Selector para editar el tipo de uva

      // 4. Modificar los campos del formulario con valores de la iteración actual
      cy.get('#create-edit-grape-type_nombre').clear().type(datos.nombre);
      cy.get('#create-edit-grape-type_ph').clear().type(datos.ph);
      cy.get('#create-edit-grape-type_humedad').clear().type(datos.humedad);
      cy.get('#create-edit-grape-type_temperatura').clear().type(datos.temperatura);
      cy.get('#create-edit-grape-type_tiempo_cosecha').clear().type(datos.tiempoCosecha);
      cy.get('#create-edit-grape-type_descripcion').clear().type(datos.descripcion);

      // 5. Guardar los cambios en el tipo de uva
      cy.get('.ant-btn').click();

      // 6. Verificar la notificación de éxito
      cy.get('.ant-message-custom-content > :nth-child(2)').should('have.text', 'Tipo de uva actualizado exitosamente');

    });
  });

});
