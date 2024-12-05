import PrioList from '../../src/components/prio-list/PrioList'
import { useStore } from '../../src/data/store'

describe('PrioList Component', () => {
  beforeEach(() => {
    useStore.setState({
      todos: [
        { id: 1, text: "Göra klart inlämning", done: false, day: "må" },
        { id: 2, text: "Läsa kapitel 3", done: true, day: "ti" }
      ]
    })
    cy.mount(<PrioList />)
  })

  it('should display search title', () => {
    cy.get('[data-cy="search-title"]').should('contain', 'Vad ska jag göra nu?')
  })

  it('should filter todos based on search input', () => {
    cy.get('[data-cy="search-input"]').type('inlämning')
    cy.get('[data-cy="todo-item"]').should('have.length', 1)
    cy.get('[data-cy="todo-item"]').should('contain', 'Göra klart inlämning')
  })

  it('should show message when no todos match search', () => {
    cy.get('[data-cy="search-input"]').type('xyz123')
    cy.get('[data-cy="no-todo"]').should('be.visible')
    cy.get('[data-cy="no-todo"]').should('contain', 'Inga uppgifter matchar din sökning')
  })
})