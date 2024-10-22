describe('Caso de Uso 6 - Visualización de Listado de Usuarios Registrados', () => {

  const combinacionesDeDatos = [
    // Administrador del Sistema - puede crear, modificar y consultar
    { 
      usuario: 'admin', 
      contrasena: '1234', 
      rol: 'Administrador del Sistema', 
      puedeCrear: true, 
      puedeModificar: true, 
      puedeConsultar: true 
    },
    // Auditor - solo puede consultar
    { 
      usuario: 'auditor', 
      contrasena: '1234', 
      rol: 'Auditor', 
      puedeCrear: false, 
      puedeModificar: false, 
      puedeConsultar: false 
    },
  ];

  combinacionesDeDatos.forEach((datos, index) => {
    it(`Verificación de visualización de usuarios registrados - Iteración ${index + 1}`, () => {

      // 1. Inicio de sesión con credenciales del usuario
      cy.visit('https://vino-costero-frontend-st-349319288826.us-central1.run.app/login');
      cy.get('#login_usuario').clear().type(datos.usuario);
      cy.get('#login_contrasena').clear().type(datos.contrasena);
      cy.get('.ant-btn > span').click();

      // 2. Acceso al módulo de gestión de usuarios
      cy.get('.ant-space > :nth-child(1) > span').click(); // Abrir menú de gestión de usuarios

      // Verificar si el rol tiene acceso a modificar usuarios
      if (!datos.puedeConsultar) {
        // Verificar que el botón para entrar en gestión de usuarios esté deshabilitado y terminar la prueba
        cy.get('.ant-dropdown-menu > :nth-child(3)')
          .should('not.exist');
        return;
      } else {
        // Si puede consultar, continuar con el flujo normal
        cy.get('.ant-dropdown-menu > :nth-child(3)').click(); // Seleccionar "Modificar usuario"
      }

      // 3. Verificación de columnas y secciones en la tabla de usuarios
      cy.get('.ant-table-thead > tr > :nth-child(1)').click().should('be.visible'); // Columna 'Nombre de Usuario'
      cy.get('.ant-table-thead > tr > :nth-child(2)').click().should('be.visible'); // Columna 'Correo Electrónico'
      cy.get('.ant-table-thead > tr > :nth-child(3)').click().should('be.visible'); // Columna 'Rol Asignado'
      cy.get('.ant-table-thead > tr > :nth-child(4)').click().should('be.visible'); // Columna 'Estado'

      // 4. Verificación de opciones de edición de usuarios
      // if (datos.puedeModificar) {
      //   // Asegurarse de que haya una fila de tabla visible antes de verificar el botón de edición
      //   cy.get('.ant-table-row')
      //     .first() // Tomar la primera fila visible
      //     .within(() => {
      //       cy.get('.anticon-edit').should('be.visible'); // Verificar el botón de edición dentro de la fila
      //     });
      // } else {
      //   // Verificar que el botón de edición no esté presente en la fila cuando no se puede modificar
      //   cy.get('.ant-table-row')
      //     .first() // Tomar la primera fila visible
      //     .within(() => {
      //       cy.get('.anticon-edit').should('not.exist'); // Fallar si el botón de edición está presente
      //     });
      // }

      // 5. Verificación de opción de crear usuario
      // if (datos.puedeCrear) {
      //   // Verificar si el botón de crear usuario está visible
      //   cy.get('.ant-btn-create-user').should('be.visible'); // Botón de creación de nuevo usuario
      // } else {
      //   // Verificar que el botón de creación no esté visible para los roles sin acceso a crear
      //   cy.get('.ant-btn-create-user').should('not.exist');
      // }

    });
  });

});
