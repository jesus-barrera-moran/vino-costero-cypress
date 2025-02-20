describe('Caso de Uso 5 - Visualización de Listado de Siembras en Parcelas', () => {
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
    // Gestor de Producción - puede crear, modificar y consultar
    { 
      usuario: 'gestor', 
      contrasena: '1234', 
      rol: 'Gestor de Producción', 
      puedeCrear: true, 
      puedeModificar: true, 
      puedeConsultar: true 
    },
    // Supervisor de Campo - puede crear y consultar
    { 
      usuario: 'supervisor', 
      contrasena: '1234', 
      rol: 'Supervisor de Campo', 
      puedeCrear: true, 
      puedeModificar: true, 
      puedeConsultar: true 
    },
    // Operador de Campo - solo puede consultar
    { 
      usuario: 'operador', 
      contrasena: '1234', 
      rol: 'Operador de Campo', 
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
      puedeConsultar: true 
    },
  ];

  combinacionesDeDatos.forEach((datos, index) => {
    it(`Verificación de siembras en parcelas - Iteración ${index + 1}`, () => {

      // 1. Inicio de sesión con credenciales del usuario
      cy.visit('https://vino-costero-frontend-st-349319288826.us-central1.run.app/login');
      cy.get('#login_usuario').clear().type(datos.usuario);
      cy.get('#login_contrasena').clear().type(datos.contrasena);
      cy.get('.ant-btn').click();

      // 2. Acceso al módulo de gestión de siembras
      cy.get(':nth-child(2) > .ant-card > .ant-card-body > .ant-btn > span').click(); // Primer clic para abrir el menú

      // Verificar si el rol tiene acceso a consultar siembras
      if (!datos.puedeConsultar) {
        // Verificar que el botón para entrar en gestión de siembras esté deshabilitado y terminar la prueba
        cy.get(':nth-child(4) > .ant-card > .ant-card-body > .ant-btn')
          .should('be.disabled');
        return;
      }

      // Si puede consultar, continuar con el flujo normal
      cy.get(':nth-child(4) > .ant-card > .ant-card-body > .ant-btn').click(); // Segundo clic para entrar en gestión de siembras

      // 3. Expandir la primera fila visible de la tabla de siembras
      cy.get('.ant-table-row')
        .first() // Tomar la primera fila visible
        .within(() => {
          cy.get('.ant-table-row-expand-icon').click(); // Expandir la fila
        });

      // 4. Verificación de columnas y secciones
      cy.get('.ant-table-thead > tr > :nth-child(2)').click().should('be.visible'); // Columna 'Nombre de la Parcela'
      cy.get('.ant-table-thead > tr > :nth-child(3)').click().should('be.visible'); // Columna 'Tipo de Uva'
      cy.get('.ant-table-thead > tr > :nth-child(4)').click().should('be.visible'); // Columna 'Cantidad de Plantas'

      // 5. Verificación de opciones de edición de siembras
      if (datos.puedeModificar) {
        // Asegurarse de que haya una fila de tabla visible antes de verificar el botón de edición
        cy.get('.ant-table-row')
          .first() // Tomar la primera fila visible
          .within(() => {
            cy.get('.anticon-edit').should('be.visible'); // Verificar el botón de edición dentro de la fila
          });
      } else {
        // Verificar que el botón de edición no esté presente en la fila cuando no se puede modificar
        cy.get('.ant-table-row')
          .first() // Tomar la primera fila visible
          .within(() => {
            cy.get('.anticon-edit').should('not.exist'); // Fallar si el botón de edición está presente
          });
      }

    });
  });

});
