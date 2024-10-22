describe('Caso de Uso 4 - Creación de un Nuevo Tipo de Uva', () => {

  // Generar datos de prueba con valores realistas para Pairwise Testing
  const combinacionesDeDatos = [
    { nombre: 'Cabernet Sauvignon', ph: '5', humedad: '25', temperatura: '35', tiempoCosecha: '150', descripcion: 'Uva con cuerpo y sabor robusto' },
    { nombre: 'Merlot', ph: '6', humedad: '30', temperatura: '28', tiempoCosecha: '120', descripcion: 'Uva suave y aterciopelada' },
    { nombre: 'Syrah', ph: '7', humedad: '20', temperatura: '32', tiempoCosecha: '140', descripcion: 'Uva con notas especiadas' },
  ];

  combinacionesDeDatos.forEach((datos, index) => {
    it(`Registrar un nuevo tipo de uva - Iteración ${index + 1}`, () => {

      // 1. Inicio de sesión
      cy.visit('https://vino-costero-frontend-st-349319288826.us-central1.run.app/login');
      cy.get('#login_usuario').type('admin');
      cy.get('#login_contrasena').type('1234');
      cy.get('.ant-btn').click();

      // 2. Acceso al módulo de gestión de tipos de uvas
      cy.get(':nth-child(2) > .ant-card > .ant-card-body > .ant-btn > span').click(); // Acceder a "Gestión de Parcelas"
      cy.get(':nth-child(5) > .ant-card > .ant-card-body > .ant-btn > span').click(); // Acceder a "Gestión de Tipos de Uvas"

      // 3. Acceder al formulario de creación de un nuevo tipo de uva
      cy.get('.ant-btn').click(); // Botón para "Registrar nuevo tipo de uva"

      // 4. Rellenar el formulario con valores de la iteración actual
      cy.get('#create-edit-grape-type_nombre').clear().type(datos.nombre);
      cy.get('#create-edit-grape-type_ph').clear().type(datos.ph);
      cy.get('#create-edit-grape-type_humedad').clear().type(datos.humedad);
      cy.get('#create-edit-grape-type_temperatura').clear().type(datos.temperatura);
      cy.get('#create-edit-grape-type_tiempo_cosecha').clear().type(datos.tiempoCosecha);
      cy.get('#create-edit-grape-type_descripcion').clear().type(datos.descripcion);

      // 5. Guardar el nuevo tipo de uva
      cy.get('.ant-btn > span').click();

      // 6. Verificar la notificación de éxito
      cy.get('.ant-message-custom-content > :nth-child(2)').should('have.text', 'Nuevo tipo de uva registrado exitosamente');

    });
  });

});
