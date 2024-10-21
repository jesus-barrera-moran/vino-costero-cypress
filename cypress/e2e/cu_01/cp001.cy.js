describe('Caso de Uso 1 - Registro de Parcelas', () => {

  // Generar datos de prueba con valores realistas y únicos
  const timestamp = Date.now(); // Generar timestamp para unicidad
  const combinacionesDeDatos = [
    { nombre: `Parcela A ${timestamp}`, longitud: '-70.6483', latitud: '-33.4569', ubicacion: `Ubicación Santiago ${timestamp}`, superficie: '100', longitudDimension: '200', anchura: '300', pendiente: '5', ph: '6.5', humedad: '70', temperatura: '22' },
    { nombre: `Parcela B ${timestamp}`, longitud: '-68.1193', latitud: '-38.9392', ubicacion: `Ubicación Neuquén ${timestamp}`, superficie: '150', longitudDimension: '250', anchura: '350', pendiente: '10', ph: '5.5', humedad: '60', temperatura: '20' },
    { nombre: `Parcela C ${timestamp}`, longitud: '-63.6167', latitud: '-38.4161', ubicacion: `Ubicación Buenos Aires ${timestamp}`, superficie: '200', longitudDimension: '300', anchura: '400', pendiente: '15', ph: '7.0', humedad: '80', temperatura: '24' },
  ];

  combinacionesDeDatos.forEach((datos, index) => {
    it(`Registrar nueva parcela - Iteración ${index + 1}`, () => {

      // 1. Inicio de sesión
      cy.visit('https://vino-costero-frontend-st-349319288826.us-central1.run.app/login');
      cy.get('#login_usuario').type('admin');
      cy.get('#login_contrasena').type('1234');
      cy.get('.ant-btn').click();

      // 2. Acceso al módulo de gestión de parcelas
      cy.get(':nth-child(2) > .ant-card > .ant-card-body > .ant-btn > span').click();
      cy.get(':nth-child(2) > .ant-card > .ant-card-body > .ant-btn > span').click();
      cy.get('.ant-btn > span').click();

      // 3. Rellenar formulario de registro de nueva parcela con valores únicos y realistas
      cy.get('#parcel-form_nombre').type(datos.nombre);
      
      // Seleccionar el estado de la parcela
      cy.get('#parcel-form_estado_parcela').click();
      cy.get('.ant-select-item-option-active > .ant-select-item-option-content').click();
      
      // Ingresar coordenadas de longitud y latitud
      cy.get('#parcel-form_longitud').clear().type(datos.longitud);
      cy.get('#parcel-form_latitud').clear().type(datos.latitud);
      
      // Ingresar la ubicación única
      cy.get('#parcel-form_ubicacion').type(datos.ubicacion);
      
      // Ingresar las dimensiones de la parcela
      cy.get('#parcel-form_dimensiones_superficie').type(datos.superficie);
      cy.get('#parcel-form_dimensiones_longitud').type(datos.longitudDimension);
      cy.get('#parcel-form_dimensiones_anchura').type(datos.anchura);
      cy.get('#parcel-form_dimensiones_pendiente').type(datos.pendiente);
      
      // Expandir el panel de Control de Tierra
      cy.get(':nth-child(2) > .ant-collapse-header > .ant-collapse-header-text').click();
      cy.get('#parcel-form_control_tierra_ph').type(datos.ph);
      cy.get('#parcel-form_control_tierra_humedad').type(datos.humedad);
      cy.get('#parcel-form_control_tierra_temperatura').type(datos.temperatura);

      // Guardar el registro de la nueva parcela
      cy.get('.ant-btn').click();

      // Verificar la notificación de éxito
      cy.get('.ant-message-custom-content > :nth-child(2)').should('have.text', 'La parcela ha sido registrada exitosamente');

    });
  });

});
