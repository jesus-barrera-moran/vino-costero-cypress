describe('Caso de Uso 2 - Visualización del Historial de Registros de Dimensiones de una Parcela', () => {

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
    // Gestor de Producción - no puede crear ni modificar
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
    it(`Verificación de visualización del historial de dimensiones de parcelas - Iteración ${index + 1}`, () => {

      // 1. Inicio de sesión con credenciales del usuario
      cy.visit('https://vino-costero-frontend-st-349319288826.us-central1.run.app/login');
      cy.get('#login_usuario').clear().type(datos.usuario);
      cy.get('#login_contrasena').clear().type(datos.contrasena);
      cy.get('.ant-btn > span').click();

      // 2. Acceso al módulo de gestión de dimensiones de parcelas
      cy.get(':nth-child(2) > .ant-card > .ant-card-body > .ant-btn > span').click(); // Primer clic para abrir el menú

      // Verificar si el rol tiene acceso a consultar dimensiones
      if (!datos.puedeConsultar) {
        // Verificar que el botón para entrar en gestión de dimensiones esté deshabilitado y terminar la prueba
        cy.get(':nth-child(3) > .ant-card > .ant-card-body > .ant-btn')
          .should('be.disabled');
        return;
      } else {
        // Si puede consultar, continuar con el flujo normal
        cy.get(':nth-child(3) > .ant-card > .ant-card-body > .ant-btn').click(); // Segundo clic para entrar en gestión de dimensiones
      }

      // 3. Expandir la primera fila de la tabla de dimensiones
      cy.get('.ant-table-row')
        .first() // Selección dinámica de la primera fila
        .within(() => {
          cy.get('.ant-table-row-expand-icon').click(); // Clic en el botón de expandir dentro de la fila
        });

      // 4. Expandir la sección del historial de dimensiones
      cy.get(':nth-child(2) > .ant-collapse-header').click(); // Expandir la sección de historial de dimensiones
      cy.get('[aria-expanded="true"] > .ant-collapse-header-text').should('be.visible'); // Verificar que se expanda correctamente

      // 5. Verificación de detalles del historial de dimensiones
      cy.get('.ant-timeline-item-content > .ant-collapse > .ant-collapse-item > .ant-collapse-header')
        .should('be.visible'); // Verificar que el historial esté visible

    });
  });

});
