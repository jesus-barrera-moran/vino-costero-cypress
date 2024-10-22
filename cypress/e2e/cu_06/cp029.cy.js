describe('Caso de Uso 6 - Modificación de Usuario', () => {

  const combinacionesDeDatos = [
    { rol: 'Gestor de Producción', estado: 'habilitar' },
    { rol: 'Supervisor de Campo', estado: 'deshabilitar' },
    { rol: 'Operador de Campo', estado: 'habilitar' },
  ];

  combinacionesDeDatos.forEach((datos, index) => {
    it(`Modificar el rol o estado de un usuario - Iteración ${index + 1}`, () => {

      // 1. Inicio de sesión
      cy.visit('https://vino-costero-frontend-st-349319288826.us-central1.run.app/login');
      cy.get('#login_usuario').type('admin');
      cy.get('#login_contrasena').type('1234');
      cy.get('.ant-btn').click();

      // 2. Acceso al módulo de gestión de usuarios
      cy.get('.ant-space > :nth-child(1) > span').click(); // Abrir menú de gestión de usuarios
      cy.get('.ant-dropdown-menu > :nth-child(3)').click(); // Seleccionar "Modificar usuario"

      // 3. Seleccionar un usuario para modificar el rol
      cy.get('[data-row-key="17"] > :nth-child(3) > .ant-select > .ant-select-selector').click(); // Abrir el dropdown de roles
      cy.get('.ant-select-item-option-content').contains(datos.rol).click(); // Seleccionar el nuevo rol

      // 4. Cambiar el estado del usuario (habilitar/deshabilitar)
      cy.get('[data-row-key="17"] > :nth-child(4) > .ant-switch').click(); // Cambiar el estado directamente

      // 5. Guardar los cambios
      cy.get('.ant-card-body > :nth-child(3) > span').click(); // Guardar cambios

      // 6. Verificar la notificación de éxito
      cy.get('.ant-message-custom-content > :nth-child(2)').should('have.text', 'Cambios guardados exitosamente');

    });
  });

});
