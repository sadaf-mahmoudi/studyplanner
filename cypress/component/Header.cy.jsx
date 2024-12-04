/* eslint-disable no-undef */
import Header from "../../src/components/Header";
import { useStore } from "../../src/data/store";
import Day from "../../src/components/day/Day";

describe("Header Component", () => {
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
          day: "må",
        },
      ],
    });
    cy.mount(
      <>
        <Header />
        <Day dayName="Måndag" dayShortName="må" />
      </>
    );
  });

  it("should display the correct header text", () => {
    cy.get("h1").should("contain.text", "Min vecka");
  });

  it("should display the restart week button with correct text", () => {
    cy.get(".restart-week").contains("Starta om vecka").should("be.visible");
  });

  it("should display the start next week button with correct text", () => {
    cy.get(".start-next-week")
      .contains("Starta nästa vecka")
      .should("be.visible");
  });
});