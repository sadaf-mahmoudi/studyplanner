// cypress/component/Footer.cy.jsx
import Footer from '../../src/components/Footer'

describe('Footer Component', () => {
  beforeEach(() => {
    cy.mount(<Footer />)
  })

  it('should display copyright text', () => {
    cy.get('[data-cy="footer-text"]').should('contain', '© 2024')
  })

  it('should display author name', () => {
    cy.get('[data-cy="footer-author"]').should('contain', 'Studyplanner')
  })
})