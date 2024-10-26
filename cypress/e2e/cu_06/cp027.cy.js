describe('Caso de Uso 6 - Modificación de Datos de Perfil de Usuario', () => {

  const combinacionesDeDatos = [
    { nombre: 'Juan Modificado', apellido: 'Pérez Modificado', email: 'juan.perez.modificado@correo.com' },
    { nombre: 'Ana Actualizada', apellido: 'López Actualizada', email: 'ana.lopez.actualizada@correo.com' },
    { nombre: 'Luis Cambiado', apellido: 'García Cambiado', email: 'luis.garcia.cambiado@correo.com' },
  ];

  combinacionesDeDatos.forEach((datos, index) => {
    it(`Modificar los datos de perfil de usuario - Iteración ${index + 1}`, () => {

      // 1. Inicio de sesión
      cy.visit('https://vino-costero-frontend-st-349319288826.us-central1.run.app/login');
      cy.get('#login_usuario').type('admin');
      cy.get('#login_contrasena').type('1234');
      cy.get('.ant-btn').click();

      // 2. Acceso al módulo de gestión de usuarios
      cy.get('.ant-space > :nth-child(1) > span').click(); // Abrir menú de gestión de usuarios
      cy.get('.ant-dropdown-menu > :nth-child(1)').click(); // Seleccionar "Modificar usuario"

      // 3. Modificar el nombre, apellido y correo electrónico
      cy.get('#create-user_nombre').clear().type(datos.nombre);
      cy.get('#create-user_apellido').clear().type(datos.apellido);
      cy.get('#create-user_email').clear().type(datos.email);

      // 4. Guardar los cambios
      cy.get('.ant-btn').click();

      // 5. Verificar la notificación de éxito
      cy.get('.ant-message-custom-content > :nth-child(2)').should('have.text', 'Usuario actualizado exitosamente');

    });
  });

});
