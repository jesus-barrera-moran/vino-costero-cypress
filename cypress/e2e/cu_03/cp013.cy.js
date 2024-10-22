describe('Caso de Uso 3 - Visualización de Listado de Controles de Tierra', () => {

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
    // Operador de Campo - no puede crear ni modificar, solo consultar
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
    it(`Verificación de controles de tierra - Iteración ${index + 1}`, () => {

      // 1. Inicio de sesión con credenciales del usuario
      cy.visit('https://vino-costero-frontend-st-349319288826.us-central1.run.app/login');
      cy.get('#login_usuario').clear().type(datos.usuario);
      cy.get('#login_contrasena').clear().type(datos.contrasena);
      cy.get('.ant-btn > span').click();

      // 2. Acceso al módulo de gestión de controles de tierra
      cy.get(':nth-child(2) > .ant-card > .ant-card-body > .ant-btn > span').click(); // Primer clic para abrir el menú

      // Verificar si el rol tiene acceso a modificar controles de tierra
      if (!datos.puedeConsultar) {
        // Verificar que el botón para entrar en gestión de controles de tierra esté deshabilitado y terminar la prueba
        cy.get(':nth-child(1) > .ant-card > .ant-card-body > .ant-btn')
          .should('be.disabled');
        return;
      }

      // Si puede consultar, continuar con el flujo normal
      cy.get(':nth-child(1) > .ant-card > .ant-card-body > .ant-btn').click(); // Segundo clic para entrar en gestión de controles de tierra

      // 3. Expandir una fila de la tabla de controles de tierra
      cy.get('[data-row-key="44"] > .ant-table-row-expand-icon-cell > .ant-table-row-expand-icon').click();

      // 4. Verificación de columnas y secciones
      cy.get('.ant-table-thead > tr > :nth-child(2)').click().should('be.visible'); // Columna 'Nombre de la Parcela'
      cy.get('.ant-table-thead > tr > :nth-child(3)').click().should('be.visible'); // Columna 'Humedad'
      cy.get('.ant-table-thead > tr > :nth-child(4)').click().should('be.visible'); // Columna 'Temperatura'
      cy.get('.ant-table-thead > tr > :nth-child(5)').click().should('be.visible'); // Columna 'PH'

      // 5. Verificación de opciones de edición de controles de tierra
      if (datos.puedeModificar) {
        // Asegurarse de que el botón de edición está visible en la fila expandida
        cy.get('[data-row-key="44"]')
          .within(() => {
            cy.get(':nth-child(5) > .anticon > svg').should('be.visible'); // Verificar el ícono de edición
          });
      } else {
        // Verificar que no exista el botón de edición si no tiene permisos de modificación
        cy.get('[data-row-key="44"]')
          .within(() => {
            cy.get(':nth-child(5) > .anticon > svg').should('not.exist');
          });
      }

    });
  });

});
