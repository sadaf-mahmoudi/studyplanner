// cypress/e2e/app.cy.js
describe('Studyplanner App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173')
  })

  it('should add a new todo', () => {
    // Klicka på första "Ny uppgift" knappen
    cy.get('button').contains('Ny uppgift').first().click()
    
    // Skriv in text i det specifika input-fältet
    cy.get('.day').first().find('input[type="text"]').first().type('Test uppgift')
    
    // Klicka på "Spara" knappen
    cy.get('button').contains('Spara').click()
    
    // Verifiera att uppgiften har lagts till
    cy.contains('Test uppgift').should('exist')
  })

  it('should start next week', () => {
    cy.contains('Starta nästa vecka').click()
  })

  it('should restart week', () => {
    cy.contains('Starta om vecka').click()
  })
})