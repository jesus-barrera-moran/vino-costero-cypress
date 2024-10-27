describe('Caso de Uso 5 - Creación de Siembra en una Parcela', () => {

  const timestamp = Date.now(); 
  const combinacionesDeDatos = [
    { fecha: '2023-10-21', cantidadPlantas: '2000', tecnica: `Siembra directa ${timestamp}` },
    { fecha: '2023-10-15', cantidadPlantas: '2500', tecnica: `Trasplante ${timestamp}` },
    { fecha: '2023-10-10', cantidadPlantas: '1500', tecnica: `Siembra asistida ${timestamp}` },
  ];

  combinacionesDeDatos.forEach((datos, index) => {
    it(`Registrar una nueva siembra en una parcela - Iteración ${index + 1}`, () => {

      // 1. Inicio de sesión
      cy.visit('https://vino-costero-frontend-st-349319288826.us-central1.run.app/login');
      cy.get('#login_usuario').type('admin');
      cy.get('#login_contrasena').type('1234');
      cy.get('.ant-btn').click();

      // 2. Acceso al módulo de gestión de siembras
      cy.get(':nth-child(2) > .ant-card > .ant-card-body > .ant-btn > span').click();
      cy.get(':nth-child(4) > .ant-card > .ant-card-body > .ant-btn > span').click();

      // 3. Iniciar la creación de una nueva siembra
      cy.get('.ant-btn > span').click(); 

      // 4. Seleccionar la parcela para la siembra
      cy.get('#create-sowing_parcela').click();
      cy.wait(1000);
      cy.get('.ant-select-item-option-active > .ant-select-item-option-content').click();

      // 5. Seleccionar el primer tipo de uva del dropdown
      cy.get('#create-sowing_id_tipo_uva').click();
      cy.get(':nth-child(4) > .ant-select-dropdown > :nth-child(1) > .rc-virtual-list > .rc-virtual-list-holder > :nth-child(1) > .rc-virtual-list-holder-inner > .ant-select-item-option-active > .ant-select-item-option-content').click();

      // 6. Ingresar la fecha de plantación
      cy.get('.ant-picker-input').click();
      cy.get('.ant-picker-cell-inner').contains(new Date(datos.fecha).getDate()).click();

      // 7. Ingresar la cantidad de plantas sembradas
      cy.get('#create-sowing_cantidad_plantas').clear().type(datos.cantidadPlantas);

      // 8. Ingresar la técnica de siembra
      cy.get('#create-sowing_tecnica_siembra').clear().type(datos.tecnica);

      // 9. Guardar la nueva siembra
      cy.get('.ant-btn').click();

      // 10. Verificar la notificación de éxito
      cy.get('.ant-message-custom-content > :nth-child(2)').should('have.text', 'Siembra registrada exitosamente');

    });
  });

});
