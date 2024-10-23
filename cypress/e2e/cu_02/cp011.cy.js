describe('Caso de Uso 2 - Modificación de Dimensiones de Parcela', () => {

  // Generar datos de prueba con valores realistas para Pairwise Testing
  const combinacionesDeDatos = [
    // Iteración 1: Valores fuera de rango para dimensiones
    { 
      superficie: '-100', // Superficie negativa
      longitud: '-200', // Longitud negativa
      anchura: '500', 
      pendiente: '105', // Pendiente mayor al 100%
      esValido: false
    },
    // Iteración 2: Campos faltantes (dejan campos vacíos)
    { 
      superficie: '', // Superficie vacía
      longitud: '', // Longitud vacía
      anchura: '', // Anchura vacía
      pendiente: '', // Pendiente vacía
      esValido: false
    },
    // Iteración 3: Combinación válida (de control)
    { 
      superficie: '150', 
      longitud: '250', 
      anchura: '350', 
      pendiente: '12',
      esValido: true
    }
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

      // 3. Seleccionar una parcela existente para modificar sus dimensiones
      cy.get('[data-row-key="44"] > :nth-child(7) > .anticon > svg').click(); // Selector para editar dimensiones

      // 4. Modificar las dimensiones con valores de la iteración actual
      if (datos.superficie) cy.get('#edit-dimensions_superficie').clear().type(datos.superficie);
      if (datos.longitud) cy.get('#edit-dimensions_longitud').clear().type(datos.longitud);
      if (datos.anchura) cy.get('#edit-dimensions_anchura').clear().type(datos.anchura);
      if (datos.pendiente) cy.get('#edit-dimensions_pendiente').clear().type(datos.pendiente);

      // 5. Guardar las nuevas dimensiones
      cy.get('.ant-btn > span').click();

      // 6. Verificar la notificación de éxito
      cy.get('.ant-message-custom-content > :nth-child(2)').should('have.text', 'Las dimensiones se han actualizado exitosamente');

    });
  });

});
