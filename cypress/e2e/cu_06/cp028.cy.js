// Generar datos de prueba para registro de usuarios con y sin duplicidad
const timestamp = Date.now(); // Generar timestamp para unicidad
const combinacionesDeDatos = [
  // Iteración 1: Dos usuarios con el mismo nombre de usuario
  [
    { usuario: `usuario_duplicado_${timestamp}`, nombre: 'Carlos', apellido: 'Hernandez', email: `carlos.hernandez${timestamp}@correo.com`, contrasena: '1234', rol: 'Gestor de Producción', errorEsperado: 'El nombre de usuario ya está en uso' },
    { usuario: `usuario_duplicado_${timestamp}`, nombre: 'Carlos', apellido: 'Hernandez', email: `carlos.hnandez${timestamp}@correo.com`, contrasena: 'abcd', rol: 'Supervisor de Campo', errorEsperado: 'El nombre de usuario ya está en uso' }
  ],
  // Iteración 2: Dos usuarios con el mismo correo electrónico
  [
    { usuario: `usuario_unico_${timestamp + 1}`, nombre: 'Maria', apellido: 'Perez', email: `maria.perez${timestamp}@correo.com`, contrasena: 'abcd', rol: 'Auditor', errorEsperado: 'El correo electrónico ya está en uso' },
    { usuario: `usuario_unico_${timestamp + 2}`, nombre: 'Maria', apellido: 'Perez', email: `maria.perez${timestamp}@correo.com`, contrasena: 'password', rol: 'Administrador del Sistema', errorEsperado: 'El correo electrónico ya está en uso' }
  ],
  // Iteración 3: Dos usuarios completamente diferentes (registro exitoso)
  [
    { usuario: `usuario_unico_${timestamp + 3}`, nombre: 'Luis', apellido: 'Gomez', email: `luis.gomez${timestamp}@correo.com`, contrasena: '1234', rol: 'Operador de Campo', errorEsperado: null },
    { usuario: `usuario_unico_${timestamp + 4}`, nombre: 'Ana', apellido: 'Lopez', email: `ana.lopez${timestamp}@correo.com`, contrasena: 'abcd', rol: 'Supervisor de Campo', errorEsperado: null }
  ]
];

combinacionesDeDatos.forEach((iteracion, indexIteracion) => {
  it(`Registrar usuarios - Iteración ${indexIteracion + 1}`, () => {
    // 1. Inicio de sesión
    cy.visit('https://vino-costero-frontend-st-349319288826.us-central1.run.app/login');
    cy.get('#login_usuario').type('admin');
    cy.get('#login_contrasena').type('1234');
    cy.get('.ant-btn').click();

    iteracion.forEach((datos, indexUsuario) => {
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

      // 6. Verificar resultado esperado
      if (datos.errorEsperado && indexUsuario === 1) {
        // Si se espera un error, verificar el mensaje de error
        cy.get('.ant-message-error > :nth-child(2)').should('have.text', datos.errorEsperado);
      } else {
        // Si no se espera un error, verificar el mensaje de éxito
        cy.get('.ant-message-custom-content > :nth-child(2)').should('have.text', 'Usuario registrado exitosamente');
      }
    });
  });
});
