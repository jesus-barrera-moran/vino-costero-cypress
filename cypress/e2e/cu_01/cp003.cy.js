describe('Caso de Uso 1 - Visualización de Listado de Parcelas', () => {

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
    // Supervisor de Campo - puede crear y consultar
    { 
      usuario: 'supervisor', 
      contrasena: '1234', 
      rol: 'Supervisor de Campo', 
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
    it(`Verificación de visualización de parcelas - Iteración ${index + 1}`, () => {

      // 1. Inicio de sesión con credenciales del usuario
      cy.visit('https://vino-costero-frontend-st-349319288826.us-central1.run.app/login');
      cy.get('#login_usuario').clear().type(datos.usuario);
      cy.get('#login_contrasena').clear().type(datos.contrasena);
      cy.get('.ant-btn > span').click();

      // 2. Acceso al módulo de gestión de parcelas
      cy.get(':nth-child(2) > .ant-card > .ant-card-body > .ant-btn > span').click();
      cy.get(':nth-child(2) > .ant-card > .ant-card-body > .ant-btn > span').click();

      // 3. Expandir una fila de la tabla de parcelas
      cy.get('[data-row-key="44"] > .ant-table-row-expand-icon-cell > .ant-table-row-expand-icon').click();

      // 4. Verificación de columnas y secciones
      cy.get('.ant-table-thead > tr > :nth-child(2)').click().should('be.visible'); // Columna 'Nombre'
      cy.get('.ant-table-thead > tr > :nth-child(3)').click().should('be.visible'); // Columna 'Estado'

      cy.get('.ant-table-thead > tr > :nth-child(6)').click().should('be.visible'); // Columna 'Dimensiones'
      cy.get('.ant-table-thead > tr > :nth-child(7)').click().should('be.visible'); // Columna 'Control de Tierra'

      // 5. Verificación de opciones de edición de parcelas de forma más segura
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
