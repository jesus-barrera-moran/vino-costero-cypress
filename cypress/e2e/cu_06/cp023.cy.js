describe('Caso de Uso 6 - Creación de Usuario y Asignación de Rol', () => {

  // Generar datos de prueba para Pairwise Testing
  const timestamp = Date.now(); // Generar timestamp para unicidad en el nombre de usuario y correo electrónico
  const combinacionesDeDatos = [
    { usuario: `usuario_prueba_${timestamp}`, nombre: 'Juan', apellido: 'Pérez', email: `juan.perez${timestamp}@correo.com`, contrasena: '1234', rol: 'Supervisor de Campo' },
    { usuario: `usuario_prueba_${timestamp + 1}`, nombre: 'Ana', apellido: 'López', email: `ana.lopez${timestamp}@correo.com`, contrasena: 'abcd', rol: 'Gestor de Producción' },
    { usuario: `usuario_prueba_${timestamp + 2}`, nombre: 'Luis', apellido: 'García', email: `luis.garcia${timestamp}@correo.com`, contrasena: 'password', rol: 'Operador de Campo' },
  ];

  combinacionesDeDatos.forEach((datos, index) => {
    it(`Registrar un nuevo usuario con rol - Iteración ${index + 1}`, () => {

      // 1. Inicio de sesión
      cy.visit('https://vino-costero-frontend-st-349319288826.us-central1.run.app/login');
      cy.get('#login_usuario').type('admin');
      cy.get('#login_contrasena').type('1234');
      cy.get('.ant-btn').click();

      // 2. Acceso al módulo de gestión de usuarios
      cy.get('.ant-space > :nth-child(1) > span').click(); // Abrir menú de gestión de usuarios
      cy.get('.ant-dropdown-menu > :nth-child(2)').click(); // Seleccionar "Registrar nuevo usuario"

      // 3. Completar el formulario de creación de usuario
      cy.get('#create-user_usuario').clear().type(datos.usuario);
      cy.get('#create-user_nombre').clear().type(datos.nombre);
      cy.get('#create-user_apellido').clear().type(datos.apellido);
      cy.get('#create-user_email').clear().type(datos.email);
      cy.get('#create-user_contrasena').clear().type(datos.contrasena);
      cy.get('#create-user_confirmarContrasena').clear().type(datos.contrasena);

      // 4. Seleccionar el rol predefinido para el usuario
      cy.get('#create-user_rol').click();
      cy.contains(datos.rol).click(); // Seleccionar el rol desde el dropdown

      // 5. Guardar el nuevo usuario
      cy.get('.ant-btn').click();

      // 6. Verificar la notificación de éxito
      cy.get('.ant-message-custom-content > :nth-child(2)').should('have.text', 'Usuario registrado exitosamente');

    });
  });

});
