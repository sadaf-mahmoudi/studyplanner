// cypress/component/Summary.cy.jsx
import Summary from '../../src/components/Summary'
import { useStore } from '../../src/data/store'

describe('Summary Component', () => {
  beforeEach(() => {
    useStore.setState({
      todos: [
        { id: 1, text: "Test todo 1", done: true, day: "må" },
        { id: 2, text: "Test todo 2", done: false, day: "må" },
        { id: 3, text: "Test todo 3", done: false, day: "ti" }
      ]
    })
    cy.mount(<Summary />)
  })

  it('should display total number of todos', () => {
    cy.get('[data-cy="total-todos"]').should('contain', '3')
  })

  it('should display number of completed todos', () => {
    cy.get('[data-cy="completed-todos"]').should('contain', '1')
  })

  it('should display number of remaining todos', () => {
    cy.get('[data-cy="remaining-todos"]').should('contain', '2')
  })
})