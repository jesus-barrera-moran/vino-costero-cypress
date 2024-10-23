describe('Caso de Uso 6 - Modificación de Usuario con Datos Inválidos', () => {

  const combinacionesDeDatos = [
    // Iteración 1: Campos vacíos (dejan campos vacíos)
    { 
      nombre: '', // Nombre vacío
      apellido: '', // Apellido vacío
      email: '', // Email vacío
      esValido: false
    },
    // Iteración 2: Email inválido (formato incorrecto)
    { 
      nombre: 'Carlos', 
      apellido: 'Mora', 
      email: 'carlos.mora@correo', // Email sin dominio correcto
      esValido: false
    },
    // Iteración 3: Combinación válida (de control)
    { 
      nombre: 'Pedro', 
      apellido: 'Fernández', 
      email: 'pedro.fernandez@correo.com', 
      esValido: true
    }
  ];

  combinacionesDeDatos.forEach((datos, index) => {
    it(`Modificar usuario con datos inválidos - Iteración ${index + 1}`, () => {

      // 1. Inicio de sesión
      cy.visit('https://vino-costero-frontend-st-349319288826.us-central1.run.app/login');
      cy.get('#login_usuario').type('admin');
      cy.get('#login_contrasena').type('1234');
      cy.get('.ant-btn').click();

      // 2. Acceso al módulo de gestión de usuarios
      cy.get('.ant-space > :nth-child(1) > span').click(); // Abrir menú de gestión de usuarios
      cy.get('.ant-dropdown-menu > :nth-child(1)').click(); // Seleccionar "Modificar usuario"

      cy.get('#create-user_nombre').clear();
      cy.get('#create-user_apellido').clear();
      cy.get('#create-user_email').clear();

      // 3. Modificar el nombre, apellido y correo electrónico si existen
      if (datos.nombre) cy.get('#create-user_nombre').clear().type(datos.nombre);
      if (datos.apellido) cy.get('#create-user_apellido').clear().type(datos.apellido);
      if (datos.email) cy.get('#create-user_email').clear().type(datos.email);

      // 4. Guardar los cambios
      cy.get('.ant-btn').click();

      // 5. Verificar si el registro es válido o no
      if (datos.esValido) {
        // Verificar la notificación de éxito
        cy.get('.ant-message-custom-content > :nth-child(2)').should('have.text', 'Usuario actualizado exitosamente');
      } else {
        // Verificar la notificación de error
        cy.get('.ant-message-custom-content > :nth-child(2)').should('have.text', 'Error al actualizar el usuario');
      }

    });
  });

});
