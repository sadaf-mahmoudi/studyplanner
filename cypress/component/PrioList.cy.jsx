/* eslint-disable no-undef */
import PrioList from "../../src/components/prio-list/PrioList";
import { useStore } from "../../src/data/store";

describe("PrioList Component", () => {
  beforeEach(() => {
    useStore.setState({
      todos: [
        { id: 1, text: "Göra klart inlämning", done: false, late: false },
        { id: 2, text: "Lektion i skolan 9-16", done: true, late: false },
        { id: 3, text: "Skriva rapport", done: false, late: true },
      ],
    });
    cy.mount(<PrioList />);
  });

  it("should display the search input", () => {
    cy.get('[data-cy="search-input"]').should("be.visible");
  });

  it("should filter todo items based on search text", () => {
    const searchText = "Göra";
    cy.get('[data-cy="search-input"]').type(searchText);
  });
});