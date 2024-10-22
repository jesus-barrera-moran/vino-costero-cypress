describe('Caso de Uso 2 - Visualización de Listado de Dimensiones de Parcelas', () => {

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
    // Gestor de Producción - no puede modificar dimensiones
    { 
      usuario: 'gestor', 
      contrasena: '1234', 
      rol: 'Gestor de Producción', 
      puedeCrear: false, 
      puedeModificar: false, 
      puedeConsultar: false 
    },
    // Supervisor de Campo - puede crear, modificar y consultar
    { 
      usuario: 'supervisor', 
      contrasena: '1234', 
      rol: 'Supervisor de Campo', 
      puedeCrear: true, 
      puedeModificar: true, 
      puedeConsultar: true 
    },
    // Operador de Campo - no puede modificar dimensiones
    { 
      usuario: 'operador', 
      contrasena: '1234', 
      rol: 'Operador de Campo', 
      puedeCrear: false, 
      puedeModificar: false, 
      puedeConsultar: false 
    },
    // Auditor - solo puede consultar
    { 
      usuario: 'auditor', 
      contrasena: '1234', 
      rol: 'Auditor', 
      puedeCrear: false, 
      puedeModificar: false, 
      puedeConsultar: true 
    },
  ];

  combinacionesDeDatos.forEach((datos, index) => {
    it(`Verificación de visualización de dimensiones de parcelas - Iteración ${index + 1}`, () => {

      // 1. Inicio de sesión con credenciales del usuario
      cy.visit('https://vino-costero-frontend-st-349319288826.us-central1.run.app/login');
      cy.get('#login_usuario').clear().type(datos.usuario);
      cy.get('#login_contrasena').clear().type(datos.contrasena);
      cy.get('.ant-btn > span').click();

      // 2. Acceso al módulo de gestión de dimensiones
      cy.get(':nth-child(2) > .ant-card > .ant-card-body > .ant-btn > span').click(); // Primer clic para abrir el menú

      // Verificar si el rol tiene acceso a modificar dimensiones
      if (!datos.puedeConsultar) {
        // Verificar que el botón para entrar en gestión de dimensiones esté deshabilitado y terminar la prueba
        cy.get(':nth-child(3) > .ant-card > .ant-card-body > .ant-btn')
          .should('be.disabled');
        return;
      }

      // Si puede modificar, continuar con el flujo normal
      cy.get(':nth-child(3) > .ant-card > .ant-card-body > .ant-btn').click(); // Segundo clic para entrar en gestión de dimensiones

      // 3. Expandir una fila de la tabla de dimensiones
      cy.get('[data-row-key="44"] > .ant-table-row-expand-icon-cell > .ant-table-row-expand-icon').click();

      // 4. Verificación de columnas y secciones
      cy.get('.ant-table-thead > tr > :nth-child(2)').click().should('be.visible'); // Columna 'Superficie'
      cy.get('.ant-table-thead > tr > :nth-child(3)').click().should('be.visible'); // Columna 'Longitud'
      cy.get('.ant-table-thead > tr > :nth-child(4)').click().should('be.visible'); // Columna 'Anchura'
      cy.get('.ant-table-thead > tr > :nth-child(5)').click().should('be.visible'); // Columna 'Pendiente'

      // 5. Verificación de opciones de edición de dimensiones
      if (datos.puedeModificar) {
        // Asegurarse de que haya una fila de tabla visible antes de verificar el botón de edición
        cy.get('.ant-table-row')
          .first() // Tomar la primera fila visible
          .within(() => {
            cy.get('.anticon-edit').should('be.visible'); // Verificar el botón de edición dentro de la fila
          });
      }

    });
  });

});
