// cypress/support/component.js
import { mount } from 'cypress/react'
import '../../src/index.css'  // Om du behöver dina stilar

Cypress.Commands.add('mount', mount)