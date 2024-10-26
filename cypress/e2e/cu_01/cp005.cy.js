describe('Caso de Uso 1 - Registro de Parcelas', () => {

    const timestamp = Date.now(); // Generar timestamp para unicidad
  
    const combinacionesDeDatos = [
      // Iteración 1: Valores fuera de rango para dimensiones y control de tierra
      { 
        nombre: `Parcela Invalida 1 ${timestamp}`, 
        longitud: '-180.5', // Valor fuera de rango
        latitud: '95.0', // Valor fuera de rango
        ubicacion: `Ubicación Inválida 1 ${timestamp}`, 
        superficie: '-100', // Superficie negativa
        longitudDimension: '-200', // Longitud negativa
        anchura: '300', 
        pendiente: '105', // Pendiente mayor al 100%
        ph: '15', // PH fuera de rango
        humedad: '150', // Humedad mayor al 100%
        temperatura: '200', // Temperatura muy alta
        esValido: false
      },
      // Iteración 2: Campos faltantes (dejan campos vacíos)
      { 
        nombre: `Parcela Invalida 2 ${timestamp}`, 
        longitud: '', // Longitud vacía
        latitud: '', // Latitud vacía
        ubicacion: `Ubicación Inválida 2 ${timestamp}`, 
        superficie: '', 
        longitudDimension: '', 
        anchura: '', 
        pendiente: '', 
        ph: '', 
        humedad: '', 
        temperatura: '', 
        esValido: false
      },
      // Iteración 3: Combinación válida (de control)
      { 
        nombre: `Parcela Valida ${timestamp}`, 
        longitud: '-70.6483', 
        latitud: '-33.4569',
        ubicacion: `Ubicación Valida ${timestamp}`, 
        superficie: '100', 
        longitudDimension: '200', 
        anchura: '300',
        pendiente: '10', 
        ph: '6.5', 
        humedad: '70',
        temperatura: '22',
        esValido: true
      }
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
        
        // Ingresar coordenadas de longitud y latitud si existen
        if (datos.longitud) cy.get('#parcel-form_longitud').clear().type(datos.longitud);
        if (datos.latitud) cy.get('#parcel-form_latitud').clear().type(datos.latitud);
        
        // Ingresar la ubicación única
        if (datos.ubicacion) cy.get('#parcel-form_ubicacion').type(datos.ubicacion);
        
        // Ingresar las dimensiones de la parcela si existen
        if (datos.superficie) cy.get('#parcel-form_dimensiones_superficie').type(datos.superficie);
        if (datos.longitudDimension) cy.get('#parcel-form_dimensiones_longitud').type(datos.longitudDimension);
        if (datos.anchura) cy.get('#parcel-form_dimensiones_anchura').type(datos.anchura);
        if (datos.pendiente) cy.get('#parcel-form_dimensiones_pendiente').type(datos.pendiente);
        
        // Expandir el panel de Control de Tierra
        cy.get(':nth-child(2) > .ant-collapse-header > .ant-collapse-header-text').click();
        if (datos.ph) cy.get('#parcel-form_control_tierra_ph').type(datos.ph);
        if (datos.humedad) cy.get('#parcel-form_control_tierra_humedad').type(datos.humedad);
        if (datos.temperatura) cy.get('#parcel-form_control_tierra_temperatura').type(datos.temperatura);
  
        // Guardar el registro de la nueva parcela
        cy.get('.ant-btn').click();
  
        if (datos.esValido) {
          // Verificar la notificación de éxito
          cy.get('.ant-message-custom-content > :nth-child(2)').should('have.text', 'La parcela ha sido registrada exitosamente');
        } else {
          // Verificar la notificación de error
          cy.get('.ant-message-custom-content > :nth-child(2)').should('have.text', 'Hubo un error al procesar la solicitud');
        }
  
      });
    });
  
  });
  