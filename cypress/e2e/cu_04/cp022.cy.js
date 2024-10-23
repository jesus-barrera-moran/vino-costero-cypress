describe('Caso de Uso 4 - Creación de un Nuevo Tipo de Uva', () => {

  const timestamp = Date.now(); // Generar timestamp para unicidad
  const combinacionesDeDatos = [
    // Iteración 1: Valores fuera de rango para requisitos de suelo
    { 
      nombre: `Uva Invalida 1 ${timestamp}`, 
      ph: '15', // PH fuera de rango
      humedad: '150', // Humedad mayor al 100%
      temperatura: '200', // Temperatura muy alta
      tiempoCosecha: '500', // Tiempo de cosecha demasiado alto
      descripcion: 'Datos fuera de rango',
      esValido: false
    },
    // Iteración 2: Campos faltantes (dejan campos vacíos)
    { 
      nombre: '', // Nombre vacío
      ph: '', // PH vacío
      humedad: '', // Humedad vacía
      temperatura: '', // Temperatura vacía
      tiempoCosecha: '', // Tiempo de cosecha vacío
      descripcion: '', // Descripción vacía
      esValido: false
    },
    // Iteración 3: Combinación válida (de control)
    { 
      nombre: `Uva Valida ${timestamp}`, 
      ph: '6.5', 
      humedad: '70', 
      temperatura: '22', 
      tiempoCosecha: '150',
      descripcion: 'Uva de alta calidad',
      esValido: true
    }
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
      if (datos.nombre) cy.get('#create-edit-grape-type_nombre').clear().type(datos.nombre);
      if (datos.ph) cy.get('#create-edit-grape-type_ph').clear().type(datos.ph);
      if (datos.humedad) cy.get('#create-edit-grape-type_humedad').clear().type(datos.humedad);
      if (datos.temperatura) cy.get('#create-edit-grape-type_temperatura').clear().type(datos.temperatura);
      if (datos.tiempoCosecha) cy.get('#create-edit-grape-type_tiempo_cosecha').clear().type(datos.tiempoCosecha);
      if (datos.descripcion) cy.get('#create-edit-grape-type_descripcion').clear().type(datos.descripcion);

      // 5. Guardar el nuevo tipo de uva
      cy.get('.ant-btn > span').click();

      // 6. Verificar la notificación de éxito o error
      if (datos.esValido) {
        cy.get('.ant-message-custom-content > :nth-child(2)').should('have.text', 'Nuevo tipo de uva registrado exitosamente');
      } else {
        cy.get('.ant-message-custom-content > :nth-child(2)').should('have.text', 'Error al registrar el tipo de uva');
      }
    });
  });

});
