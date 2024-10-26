describe('Caso de Uso 6 - Inicio de Sesión', () => {

  const combinacionesDeDatos = [
    // Iteración 1: Credenciales inválidas (usuario incorrecto)
    { 
      usuario: 'usuario_incorrecto', 
      contraseña: '12345',
      esValido: false
    },
    // Iteración 2: Credenciales inválidas (contraseña incorrecta)
    { 
      usuario: 'admin', 
      contraseña: 'contraseña_incorrecta',
      esValido: false
    },
    // Iteración 3: Combinación válida (de control)
    { 
      usuario: 'admin', 
      contraseña: '1234',
      esValido: true
    }
  ];

  combinacionesDeDatos.forEach((datos, index) => {
    it(`Intento de inicio de sesión - Iteración ${index + 1}`, () => {

      // 1. Visitar la página de inicio de sesión
      cy.visit('https://vino-costero-frontend-st-349319288826.us-central1.run.app/login');

      // 2. Ingresar el nombre de usuario si existe
      if (datos.usuario) cy.get('#login_usuario').clear().type(datos.usuario);

      // 3. Ingresar la contraseña si existe
      if (datos.contraseña) cy.get('#login_contrasena').clear().type(datos.contraseña);

      // 4. Hacer clic en el botón de iniciar sesión
      cy.get('.ant-btn > span').click();

      // 5. Verificar si el inicio de sesión es exitoso o falla
      if (datos.esValido) {
        // Verificar mensaje de éxito
        cy.get('.ant-message-custom-content > :nth-child(2)').should('have.text', 'Inicio de sesión exitoso');
      } else {
        // Verificar mensaje de error
        cy.get('.ant-message-custom-content > :nth-child(2)').should('contains.text', 'Error');
      }

    });
  });

});
