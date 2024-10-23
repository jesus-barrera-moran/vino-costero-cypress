describe('Caso de Uso 4 - Registro de Tipos de Uvas con Validación de Duplicidad', () => {

  const timestamp = Date.now();

  const combinacionesDeDatos = [
    // Iteración 1: Dos tipos de uvas con el mismo nombre
    [
      { 
        nombre: `Uva Duplicada ${timestamp}`, 
        humedad: '30', 
        temperatura: '25',
        ph: '4',
        tiempoCosecha: '100',
        descripcion: 'Primera uva duplicada',
        errorEsperado: null
      },
      { 
        nombre: `Uva Duplicada ${timestamp}`, 
        humedad: '35', 
        temperatura: '27',
        ph: '5',
        tiempoCosecha: '110',
        descripcion: 'Segunda uva duplicada',
        errorEsperado: 'El nombre del tipo de uva ya existe'
      }
    ],
    // Iteración 2: Dos tipos de uvas con datos completamente diferentes
    [
      { 
        nombre: `Uva Única 1 ${timestamp}`, 
        humedad: '40', 
        temperatura: '28',
        ph: '6',
        tiempoCosecha: '120',
        descripcion: 'Primera uva única',
        errorEsperado: null
      },
      { 
        nombre: `Uva Única 2 ${timestamp}`, 
        humedad: '45', 
        temperatura: '30',
        ph: '7',
        tiempoCosecha: '130',
        descripcion: 'Segunda uva única',
        errorEsperado: null
      }
    ]
  ];

  combinacionesDeDatos.forEach((iteracion, index) => {
    it(`Verificación de registro de tipos de uvas - Iteración ${index + 1}`, () => {

      // 1. Inicio de sesión con credenciales del usuario
      cy.visit('https://vino-costero-frontend-st-349319288826.us-central1.run.app/login');
      cy.get('#login_usuario').clear().type('admin');
      cy.get('#login_contrasena').clear().type('1234');
      cy.get('.ant-btn').click();

      // 2. Acceso al módulo de gestión de tipos de uvas
      cy.get(':nth-child(2) > .ant-card > .ant-card-body > .ant-btn > span').click();
      cy.get(':nth-child(5) > .ant-card > .ant-card-body > .ant-btn > span').click();

      // Registrar dos tipos de uvas por iteración
      iteracion.forEach((datos, subIndex) => {
        // 3. Intentar registrar un nuevo tipo de uva
        cy.get('.ant-btn > span').click(); // Clic en "Registrar Nuevo Tipo de Uva"
        cy.get('#create-edit-grape-type_nombre').clear().type(datos.nombre);
        cy.get('#create-edit-grape-type_humedad').clear().type(datos.humedad);
        cy.get('#create-edit-grape-type_temperatura').clear().type(datos.temperatura);
        cy.get('#create-edit-grape-type_ph').clear().type(datos.ph);
        cy.get('#create-edit-grape-type_tiempo_cosecha').clear().type(datos.tiempoCosecha);
        cy.get('#create-edit-grape-type_descripcion').clear().type(datos.descripcion);

        // 4. Intentar guardar el tipo de uva
        cy.get('.ant-btn').click();

        // 5. Verificar la notificación de error esperada o éxito
        if (datos.errorEsperado) {
          cy.get('.ant-message-notice-content').should('contain.text', datos.errorEsperado);
        } else {
          cy.get('.ant-message-notice-content').should('contain.text', 'Nuevo tipo de uva registrado exitosamente');
        }
      });

    });
  });

});
