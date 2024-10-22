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
    // Gestor de Producción - puede modificar y consultar
    { 
      usuario: 'gestor', 
      contrasena: '1234', 
      rol: 'Gestor de Producción', 
      puedeCrear: false, 
      puedeModificar: false, 
      puedeConsultar: false 
    },
    // Supervisor de Campo - puede consultar pero no puede modificar
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

      // 3. Expandir una fila de la tabla de controles de tierra
      cy.get('[data-row-key="44"] > .ant-table-row-expand-icon-cell > .ant-table-row-expand-icon').click();

      // 4. Expandir la sección del historial de controles de tierra
      cy.get('[style="background-color: rgb(255, 255, 255); border-radius: 5px;"] > .ant-collapse-header').click();
      cy.get('[aria-expanded="true"] > .ant-collapse-header-text').should('be.visible'); // Verificar que el historial esté visible

      // 5. Verificación de detalles del historial de controles de tierra
      cy.get('.ant-timeline-item-content > .ant-collapse > .ant-collapse-item > .ant-collapse-header')
        .should('be.visible'); // Verificar que el historial de controles esté visible

      // // 6. Verificación de opciones de edición de controles de tierra
      // if (datos.puedeModificar) {
      //   // Verificar el botón de edición en el primer registro del historial
      //   cy.get('.ant-timeline-item-content')
      //     .first() // Tomar el primer registro del historial
      //     .within(() => {
      //       cy.get('.anticon-edit').should('be.visible'); // Verificar el botón de edición dentro del registro
      //     });
      // } else {
      //   // Verificar que el botón de edición no esté presente en el historial cuando no se puede modificar
      //   cy.get('.ant-timeline-item-content')
      //     .first() // Tomar el primer registro del historial
      //     .within(() => {
      //       cy.get('.anticon-edit').should('not.exist'); // Fallar si el botón de edición está presente
      //     });
      // }

      // // 7. Verificación de opción de crear control de tierra
      // if (datos.puedeCrear) {
      //   // Verificar si el botón de crear nuevo control de tierra está visible
      //   cy.get('.ant-btn-create-soil-control').should('be.visible'); // Botón de creación de nuevo control de tierra
      // } else {
      //   // Verificar que el botón de creación no esté visible para los roles sin acceso a crear
      //   cy.get('.ant-btn-create-soil-control').should('not.exist');
      // }

    });
  });

});
