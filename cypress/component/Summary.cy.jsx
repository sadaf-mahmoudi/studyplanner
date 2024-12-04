/* eslint-disable no-undef */
import { useStore } from "../../src/data/store";
import App from "../../src/App";

describe("Todo Application", () => {
  beforeEach(() => {
    useStore.setState({
      todos: [
        {
          id: 1,
          text: "Göra klart inlämning",
          done: true,
          late: false,
          day: "må",
        },
        {
          id: 2,
          text: "Lektion i skolan 9-16",
          done: true,
          late: false,
          day: "ti",
        },
        { id: 3, text: "Skriva rapport", done: true, late: true, day: "on" },
      ],
    });
    cy.mount(<App />);
  });

  it("should display the summary of todos", () => {
    cy.get('[data-cy="summary"]').should("be.visible");
    cy.get('[data-cy="summary"]').should("contain.text", "3/3 klara");
  });

  it("should mark all todos as not done when 'Starta nästa vecka' is clicked", () => {
    // Verify that all todos are initially marked as done
    cy.get('[data-cy="show-checkbox"]').each((checkbox) => {
      cy.wrap(checkbox).should("be.checked");
    });

    // Click the 'Starta nästa vecka' button
    cy.get(".start-next-week").contains("Starta nästa vecka").click();

    // Verify that all todos are marked as not done
    cy.get('[data-cy="show-checkbox"]').each((checkbox) => {
      cy.wrap(checkbox).should("not.be.checked");
    });

    // Verify that the summary is updated
    cy.get('[data-cy="summary"]').should("contain.text", "0/3 klara");
  });
});