describe('Caso de Uso 1 - Modificación de Parcelas', () => {

  // Generar datos de prueba con valores realistas para Pairwise Testing
  const timestamp = Date.now(); // Generar timestamp para unicidad
  const combinacionesDeDatos = [
    { nombre: `Parcela Modificada A ${timestamp}`, longitud: '-70.6482', latitud: '-33.4568', ubicacion: `Ubicación Santiago Modificada ${timestamp}`, superficie: '101', longitudDimension: '201', anchura: '301', pendiente: '6' },
    { nombre: `Parcela Modificada B ${timestamp}`, longitud: '-68.1192', latitud: '-38.9390', ubicacion: `Ubicación Neuquén Modificada ${timestamp}`, superficie: '151', longitudDimension: '251', anchura: '351', pendiente: '12' },
    { nombre: `Parcela Modificada C ${timestamp}`, longitud: '-63.6165', latitud: '-38.4160', ubicacion: `Ubicación Buenos Aires Modificada ${timestamp}`, superficie: '201', longitudDimension: '301', anchura: '401', pendiente: '18' },
  ];

  combinacionesDeDatos.forEach((datos, index) => {
    it(`Modificar una parcela existente - Iteración ${index + 1}`, () => {

      // 1. Inicio de sesión
      cy.visit('https://vino-costero-frontend-st-349319288826.us-central1.run.app/login');
      cy.get('#login_usuario').type('admin');
      cy.get('#login_contrasena').type('1234');
      cy.get('.ant-btn').click();

      // 2. Acceso al módulo de gestión de parcelas
      cy.get(':nth-child(2) > .ant-card > .ant-card-body > .ant-btn > span').click();
      cy.get(':nth-child(2) > .ant-card > .ant-card-body > .ant-btn > span').click();

      // 3. Seleccionar la primera fila de la tabla de parcelas para modificar
      cy.get('.ant-table-row')
        .first() // Selección dinámica de la primera fila
        .within(() => {
          cy.get('.anticon-edit').click(); // Clic en el botón de editar dentro de la fila
        });

      // 4. Modificar los campos de la parcela con valores únicos y realistas
      cy.get('#parcel-form_nombre').clear().type(datos.nombre);
      cy.get('#parcel-form_longitud').clear().type(datos.longitud);
      cy.get('#parcel-form_latitud').clear().type(datos.latitud);
      cy.get('#parcel-form_ubicacion').clear().type(datos.ubicacion);
      cy.get('#parcel-form_dimensiones_superficie').clear().type(datos.superficie);
      cy.get('#parcel-form_dimensiones_longitud').clear().type(datos.longitudDimension);
      cy.get('#parcel-form_dimensiones_anchura').clear().type(datos.anchura);
      cy.get('#parcel-form_dimensiones_pendiente').clear().type(datos.pendiente);

      // 5. Guardar los cambios en la parcela
      cy.get('.ant-btn > span').click();

      // 6. Verificar la notificación de éxito
      cy.get('.ant-message-custom-content > :nth-child(2)').should('have.text', 'La parcela ha sido actualizada exitosamente');

    });
  });

});
