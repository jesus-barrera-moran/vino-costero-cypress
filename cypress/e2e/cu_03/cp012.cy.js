describe('Caso de Uso 3 - Visualización del Historial de Controles de Tierra de una Parcela', () => {

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
    // Gestor de Producción - no puede consultar
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
    // Operador de Campo - no puede consultar
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
    it(`Verificación del historial de controles de tierra - Iteración ${index + 1}`, () => {

      // 1. Inicio de sesión con credenciales del usuario
      cy.visit('https://vino-costero-frontend-st-349319288826.us-central1.run.app/login');
      cy.get('#login_usuario').clear().type(datos.usuario);
      cy.get('#login_contrasena').clear().type(datos.contrasena);
      cy.get('.ant-btn > span').click();

      // 2. Acceso al módulo de controles de tierra
      cy.get(':nth-child(2) > .ant-card > .ant-card-body > .ant-btn > span').click(); // Primer clic para abrir el menú

      // Verificar si el rol tiene acceso a consultar controles de tierra
      if (!datos.puedeConsultar) {
        // Verificar que el botón para entrar en gestión de controles de tierra esté deshabilitado y terminar la prueba
        cy.get(':nth-child(1) > .ant-card > .ant-card-body > .ant-btn')
          .should('be.disabled');
        return;
      }

      // Si puede consultar, continuar con el flujo normal
      cy.get(':nth-child(1) > .ant-card > .ant-card-body > .ant-btn').click(); // Segundo clic para entrar en gestión de controles de tierra

      // 3. Expandir la primera fila de la tabla de controles de tierra
      cy.get('.ant-table-row') // Seleccionar la primera fila de la tabla
        .first() // Tomar la primera fila visible
        .within(() => {
          cy.get('.ant-table-row-expand-icon').click(); // Expandir la fila
        });

      // 4. Expandir la sección del historial de controles de tierra
      cy.get('[style="background-color: rgb(255, 255, 255); border-radius: 5px;"] > .ant-collapse-header').click();
      cy.get('[aria-expanded="true"] > .ant-collapse-header-text').should('be.visible'); // Verificar que el historial esté visible

      // 5. Verificación de detalles del historial de controles de tierra
      cy.get('.ant-timeline-item-content > .ant-collapse > .ant-collapse-item > .ant-collapse-header')
        .should('be.visible'); // Verificar que el historial de controles esté visible

    });
  });

});
