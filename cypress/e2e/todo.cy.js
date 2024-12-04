describe('Todo Application', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should load the app', () => {
    cy.contains('Min vecka').should('be.visible');
  });

  it('should add a new todo', () => {
    // Välj specifik dag, t.ex. Måndag
    cy.contains('Måndag')
      .parent()
      .within(() => {
        cy.get('[data-cy="add-btn"]').click();
      });
    
    cy.get('[data-cy="add-task-input"]').type('Ny uppgift');
    cy.get('[data-cy="save-task-btn"]').click();
    cy.contains('Ny uppgift').should('be.visible');
  });

  it('should mark todo as done', () => {
    // Lägg till en ny uppgift först
    cy.contains('Måndag')
      .parent()
      .within(() => {
        cy.get('[data-cy="add-btn"]').click();
      });
    
    cy.get('[data-cy="add-task-input"]').type('Uppgift att markera');
    cy.get('[data-cy="save-task-btn"]').click();

    // Nu kan vi markera uppgiften som klar
    cy.contains('Uppgift att markera')
      .parent()
      .within(() => {
        cy.get('[data-cy="show-checkbox"]').click();
      });
    
    cy.contains('Uppgift att markera')
      .parent()
      .find('[data-cy="show-checkbox"]')
      .should('be.checked');
  });

  it('should delete todo', () => {
    // Lägg till en ny uppgift först
    cy.contains('Måndag')
      .parent()
      .within(() => {
        cy.get('[data-cy="add-btn"]').click();
      });
    
    cy.get('[data-cy="add-task-input"]').type('Uppgift att ta bort');
    cy.get('[data-cy="save-task-btn"]').click();

    // Ta bort uppgiften
    cy.contains('Uppgift att ta bort')
      .parent()
      .within(() => {
        cy.get('[data-cy="remove-btn"]').click();
      });
    
    cy.contains('Uppgift att ta bort').should('not.exist');
  });
});