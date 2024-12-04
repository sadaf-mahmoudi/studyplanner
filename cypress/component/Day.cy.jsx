/* eslint-disable no-undef */

import Day from "../../src/components/day/Day";
import { useStore } from "../../src/data/store";

describe("Day Component", () => {
  const items = [
    { id: 1, text: "Göra klart inlämning", done: false, late: false },
    { id: 2, text: "Lektion i skolan 9-16", done: true, late: false },
  ];

  beforeEach(() => {
    // Reset zustand store to initial state before each test
    useStore.setState({
      todos: items,
      toggleTodo: (id) =>
        useStore.setState((state) => ({
          todos: state.todos.map((t) =>
            t.id === id ? { ...t, done: !t.done } : t
          ),
        })),
      addTodo: (newTodo) =>
        useStore.setState((state) => ({
          todos: [...state.todos, newTodo],
        })),
    });
    cy.mount(<Day dayName="Måndag" items={useStore.getState().todos} />);
  });

  it("should display the day name", () => {
    cy.get('[data-cy="show-dayname"]')
      .should("be.visible")
      .and("contain.text", "Måndag");
  });

  it("should display the items", () => {
    items.forEach((item) => {
      cy.get('[data-cy="todo-item"]').contains(item.text).should("be.visible");
    });
  });

  it("should have a button to add new task and the button should have a text", () => {
    cy.get('[data-cy="add-btn"]')
      .should("be.visible")
      .and("contain.text", "Ny uppgift");
  });

  it("should display input and save button when 'Ny uppgift' is clicked", () => {
    cy.get("button").contains("Ny uppgift").click();
    cy.get("[data-cy='add-task-input']").should("be.visible");
    cy.get("[data-cy='save-task-btn']").should("be.visible");
  });
});