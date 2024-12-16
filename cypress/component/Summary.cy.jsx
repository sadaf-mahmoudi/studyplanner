/* eslint-disable no-undef */
import App from "../../src/App";
import { useStore } from "../../src/data/store";

describe("Summary Component", () => {
  beforeEach(() => {
    useStore.setState({
      todos: [
        {
          id: 1,
          text: "Göra klart inlämning",
          done: false,
          late: false,
          day: "må",
        },
        {
          id: 2,
          text: "Lektion i skolan 9-16",
          done: true,
          late: false,
          day: "må",
        },
        { id: 3, text: "Skriva rapport", done: false, late: true, day: "ti" },
      ],
    });
    cy.mount(<App />);
  });

  it("should display the summary of todos", () => {
    cy.get('[data-cy="summary"]').should("be.visible");
    cy.get('[data-cy="summary"]').should("contain.text", "1/3 klara");
  });

  it("should update the summary when todos are toggled", () => {
    cy.get('[data-cy="summary"]').should("contain.text", "1/3 klara");

    cy.get('[data-cy="show-checkbox"]').first().click();
    cy.get('[data-cy="summary"]').should("contain.text", "2/3 klara");

    cy.get('[data-cy="show-checkbox"]').eq(1).click();
    cy.get('[data-cy="summary"]').should("contain.text", "1/3 klara");

    cy.get('[data-cy="show-checkbox"]').eq(2).click();
    cy.get('[data-cy="summary"]').should("contain.text", "2/3 klara");
  });

  it("should update the summary when a new todo is added", () => {
    cy.get("button").contains("Ny uppgift").click();
    cy.get("[data-cy='add-task-input']").type("Ny uppgift");
    cy.get("[data-cy='save-task-btn']").click();

    cy.get('[data-cy="summary"]').should("contain.text", "1/4 klara");
  });

  it("should update the summary when a todo is removed", () => {
    cy.get("[data-cy='remove-btn']").first().click();

    cy.get('[data-cy="summary"]').should("contain.text", "1/2 klara");
  });
});