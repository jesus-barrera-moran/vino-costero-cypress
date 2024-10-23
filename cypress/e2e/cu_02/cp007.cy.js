describe('Caso de Uso 2 - Modificación de Dimensiones de Parcela', () => {

  // Generar datos de prueba con valores realistas para Pairwise Testing
  const timestamp = Date.now(); // Generar timestamp para unicidad
  const combinacionesDeDatos = [
    { superficie: '102', longitud: '202', anchura: '302', pendiente: '7' },
    { superficie: '150', longitud: '250', anchura: '350', pendiente: '12' },
    { superficie: '200', longitud: '300', anchura: '400', pendiente: '15' },
  ];

  combinacionesDeDatos.forEach((datos, index) => {
    it(`Modificar dimensiones de una parcela existente - Iteración ${index + 1}`, () => {

      // 1. Inicio de sesión
      cy.visit('https://vino-costero-frontend-st-349319288826.us-central1.run.app/login');
      cy.get('#login_usuario').type('admin');
      cy.get('#login_contrasena').type('1234');
      cy.get('.ant-btn > span').click();

      // 2. Acceso al módulo de gestión de parcelas y luego al de dimensiones
      cy.get(':nth-child(2) > .ant-card > .ant-card-body > .ant-btn > span').click(); // Acceder a "Gestión de Parcelas"
      cy.get(':nth-child(3) > .ant-card > .ant-card-body > .ant-btn > span').click(); // Acceder a "Gestión de Dimensiones de Parcelas"

      // 3. Seleccionar la primera fila de la tabla de dimensiones para modificar
      cy.get('.ant-table-row')
        .first() // Selección dinámica de la primera fila
        .within(() => {
          cy.get(':nth-child(7) > .anticon > svg').click(); // Clic en el botón de editar dentro de la fila
        });

      // 4. Modificar las dimensiones con valores de la iteración actual
      cy.get('#edit-dimensions_superficie').clear().type(datos.superficie);
      cy.get('#edit-dimensions_longitud').clear().type(datos.longitud);
      cy.get('#edit-dimensions_anchura').clear().type(datos.anchura);
      cy.get('#edit-dimensions_pendiente').clear().type(datos.pendiente);

      // 5. Guardar las nuevas dimensiones
      cy.get('.ant-btn > span').click();

      // 6. Verificar la notificación de éxito
      cy.get('.ant-message-custom-content > :nth-child(2)').should('have.text', 'Las dimensiones se han actualizado exitosamente');

    });
  });

});
