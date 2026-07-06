
describe('sacarNuevoTurno', () => {
  it('login + sacar turno + verificar en main', () => {

    // Abre la página de login, llena el form y clickea el botón. Espera que la URL cambie a /main 
    cy.visit('/login');
    cy.get('#email').type('juan@gmail.com');
    cy.get('#password').type('1234');
    cy.contains('button', 'Iniciar sesión').click();
    cy.url({ timeout: 10000 }).should('include', '/main');

    // Obtenemos las practicas del back y vamos a la página para sacar-turno
    cy.intercept('GET', '**/practicas**').as('getPracticas');
    cy.visit('/sacar-turno');
    cy.wait('@getPracticas');

    // Se selecciona la primera practica detectada dentro del Select de react
    cy.get('div[class$="-control"]').first().click();
    cy.get('div[class$="-option"]', { timeout: 10000 }).first().then(($option) => {
      cy.wrap($option.text()).as('nombrePractica');
    });
    cy.get('div[class$="-option"]').first().click();

    // Elige un dia del turno (está configurado para que no sea ni sabado ni domingo)
    cy.get('.datepicker-input').click();
    cy.get('.react-datepicker__navigation--next').click();
    cy.get('.react-datepicker__navigation--next').click();

    cy.get('.react-datepicker__day')
      .not('.react-datepicker__day--outside-month')
      .not('.react-datepicker__day--disabled')
      .filter((_, el) => {
        const label = el.getAttribute('aria-label') ?? '';
        return !label.includes('Saturday') && !label.includes('Sunday');
      })
      .first()
      .click();

    cy.get('.datepicker-input').should('not.have.value', '');

    // Espera que el contenedor de resultados aparezca en el DOM
    cy.contains('button', 'Buscar turnos').click();
    cy.get('.turnos-disponibles-container', { timeout: 15000 }).should('be.visible');

    // Se hace click sobre el primer PosibleTurno, verificandose que se haya agregado al carrito
    cy.get('.resultados-container .posible-turno-card .btn-reservar').first().click();

    cy.get('.resultados-container .posible-turno-card .btn-reservar')
      .first()
      .should('contain', '✓ Seleccionado');

    // ─── Navegar al carrito sin recargar
    cy.get('.cart-button').click();    
    cy.url().should('include', '/carrito');

    // ─── Verificar que el turno está en el carrito y confirmarlo
    cy.get('@nombrePractica').then((nombre) => {
      cy.get('.carrito-lista').should('contain', nombre);
    });
    cy.get('.btn-confirmar-todos').click();

    // Validamos que el carrito quede vacío tras confirmar todos
    cy.get('.carrito-vacio').should('be.visible');

    // Por ultimo, comprobamos que el turno esté en main
    cy.get('.nav-app-link').contains('Inicio').first().click();    
    cy.url().should('include', '/main');

    cy.get('.tarjeta-contenedor', { timeout: 10000 }).should('be.visible');
    cy.get('@nombrePractica').then((nombre) => {
    cy.get('.tarjeta-contenedor').should('contain', nombre);
    });
  });
});