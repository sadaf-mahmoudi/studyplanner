// cypress/component/Header.cy.jsx
import Header from '../../src/components/Header'
import { useStore } from '../../src/data/store'

describe('Header Component', () => {
  beforeEach(() => {
    useStore.setState({
      todos: [
        { id: 1, text: "Test todo", done: true, day: "må" }
      ],
      restartWeek: cy.stub().as('restartWeek'),
      startNextWeek: cy.stub().as('startNextWeek')
    })
    cy.mount(<Header />)
  })

  it('should display title', () => {
    cy.get('[data-cy="header-title"]').should('contain', 'Studieplanerare')
  })

  it('should call restartWeek when restart button is clicked', () => {
    cy.get('[data-cy="restart-btn"]').click()
    cy.get('@restartWeek').should('have.been.called')
  })

  it('should call startNextWeek when next week button is clicked', () => {
    cy.get('[data-cy="next-week-btn"]').click()
    cy.get('@startNextWeek').should('have.been.called')
  })
})