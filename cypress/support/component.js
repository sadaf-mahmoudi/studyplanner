// cypress/support/component.js
import { mount } from 'cypress/react18'  // Notera: react18 istället för react
import '../../src/index.css'

Cypress.Commands.add('mount', mount)