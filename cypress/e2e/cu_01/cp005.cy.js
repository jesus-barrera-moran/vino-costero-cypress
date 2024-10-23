describe('Caso de Uso 1 - Registro de Parcelas con Validación de Duplicidad', () => {

  const timestamp = Date.now();

  const combinacionesDeDatos = [
    // Iteración 1: Dos parcelas con el mismo nombre
    [
      { 
        nombre: `Parcela Duplicada ${timestamp}`, 
        estado: 'Disponible',
        longitud: '-70.6483', 
        latitud: '-33.4569', 
        ubicacion: 'Ubicación 1',
        superficie: '2000',
        longitudParcela: '200',
        anchura: '100',
        pendiente: '5',
        ph: '5',
        humedad: '45',
        temperatura: '34',
        observaciones: 'Observación 1',
        errorEsperado: null
      },
      { 
        nombre: `Parcela Duplicada ${timestamp}`, 
        estado: 'Disponible',
        longitud: '-70.6484', 
        latitud: '-33.4570', 
        ubicacion: 'Ubicación 2',
        superficie: '2500',
        longitudParcela: '250',
        anchura: '120',
        pendiente: '4',
        ph: '6',
        humedad: '50',
        temperatura: '32',
        observaciones: 'Observación 2',
        errorEsperado: 'El nombre de la parcela ya existe'
      }
    ],
    // Iteración 2: Dos parcelas con las mismas coordenadas
    [
      { 
        nombre: `Parcela Única 1 ${timestamp}`, 
        estado: 'Disponible',
        longitud: '-70.6483', 
        latitud: '-33.4569', 
        ubicacion: 'Ubicación 1',
        superficie: '3000',
        longitudParcela: '300',
        anchura: '150',
        pendiente: '6',
        ph: '6',
        humedad: '55',
        temperatura: '35',
        observaciones: 'Observación 3',
        errorEsperado: null
      },
      { 
        nombre: `Parcela Única 2 ${timestamp}`, 
        estado: 'Disponible',
        longitud: '-70.6483', 
        latitud: '-33.4569', 
        ubicacion: 'Ubicación 2',
        superficie: '3500',
        longitudParcela: '350',
        anchura: '175',
        pendiente: '5',
        ph: '7',
        humedad: '60',
        temperatura: '36',
        observaciones: 'Observación 4',
        errorEsperado: 'Las coordenadas de la parcela ya existen'
      }
    ],
    // Iteración 3: Dos parcelas con datos completamente diferentes
    [
      { 
        nombre: `Parcela Única 3 ${timestamp}`, 
        estado: 'Disponible',
        longitud: '-70.6500', 
        latitud: '-33.4580', 
        ubicacion: 'Ubicación 3',
        superficie: '4000',
        longitudParcela: '400',
        anchura: '200',
        pendiente: '3',
        ph: '8',
        humedad: '65',
        temperatura: '38',
        observaciones: 'Observación 5',
        errorEsperado: null
      },
      { 
        nombre: `Parcela Única 4 ${timestamp}`, 
        estado: 'Disponible',
        longitud: '-70.6510', 
        latitud: '-33.4590', 
        ubicacion: 'Ubicación 4',
        superficie: '4500',
        longitudParcela: '450',
        anchura: '225',
        pendiente: '4',
        ph: '9',
        humedad: '70',
        temperatura: '40',
        observaciones: 'Observación 6',
        errorEsperado: null
      }
    ]
  ];

  combinacionesDeDatos.forEach((iteracion, index) => {
    it(`Verificación de registro de parcelas - Iteración ${index + 1}`, () => {

      // 1. Inicio de sesión con credenciales del usuario
      cy.visit('https://vino-costero-frontend-st-349319288826.us-central1.run.app/login');
      cy.get('#login_usuario').clear().type('admin');
      cy.get('#login_contrasena').clear().type('1234');
      cy.get('.ant-btn').click();

      // 2. Acceso al módulo de gestión de parcelas
      cy.get(':nth-child(2) > .ant-card > .ant-card-body > .ant-btn > span').click();
      cy.get(':nth-child(2) > .ant-card > .ant-card-body > .ant-btn > span').click();

      // Registrar dos parcelas por iteración
      iteracion.forEach((datos, subIndex) => {
        // 3. Intentar registrar una nueva parcela
        cy.get('.ant-btn > span').click(); // Clic en "Registrar Nueva Parcela"
        cy.get('#parcel-form_nombre').clear().type(datos.nombre);

        // 4. Seleccionar el estado de la parcela desde el dropdown
        cy.get('#parcel-form_estado_parcela').click(); // Abre el dropdown del estado
        cy.get(`.ant-select-item-option[title="${datos.estado}"]`).click(); // Selecciona el estado

        // 5. Completar las coordenadas y ubicación de la parcela
        cy.get('#parcel-form_longitud').clear().type(datos.longitud);
        cy.get('#parcel-form_latitud').clear().type(datos.latitud);
        cy.get('#parcel-form_ubicacion').clear().type(datos.ubicacion);

        // 6. Completar dimensiones de la parcela
        cy.get('#parcel-form_dimensiones_superficie').clear().type(datos.superficie);
        cy.get('#parcel-form_dimensiones_longitud').clear().type(datos.longitudParcela);
        cy.get('#parcel-form_dimensiones_anchura').clear().type(datos.anchura);
        cy.get('#parcel-form_dimensiones_pendiente').clear().type(datos.pendiente);

        // 7. Abrir acordeón del control de tierra
        cy.get(':nth-child(2) > .ant-collapse-header > .ant-collapse-header-text').click(); 

        // 8. Completar controles de tierra
        cy.get('#parcel-form_control_tierra_ph').clear().type(datos.ph);
        cy.get('#parcel-form_control_tierra_humedad').clear().type(datos.humedad);
        cy.get('#parcel-form_control_tierra_temperatura').clear().type(datos.temperatura);
        cy.get('#parcel-form_control_tierra_observaciones').clear().type(datos.observaciones);

        // 9. Intentar guardar la parcela
        cy.get('.ant-btn').click(); 

        // 10. Verificar la notificación de error esperada o éxito
        if (datos.errorEsperado) {
          cy.get('.ant-message-notice-content').should('contain.text', datos.errorEsperado);
        } else {
          cy.get('.ant-message-notice-content').should('contain.text', 'La parcela ha sido registrada exitosamente');
        }
      });

    });
  });

});
