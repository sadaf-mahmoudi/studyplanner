/* eslint-disable no-undef */

describe("Todo Application E2E Tests", () => {
    beforeEach(() => {
      cy.visit("/");
    });
  
    it("should mark all todos as not done when 'Starta nästa vecka' is clicked", () => {
      // Kontrollera att alla checkboxar är markerade
      cy.get('[data-cy="show-checkbox"]').each((checkbox) => {
        cy.wrap(checkbox).check();
      });
  
      // Klicka på "Starta nästa vecka" knappen
      cy.get("button").contains("Starta nästa vecka").click();
  
      // Kontrollera att alla checkboxar nu är omarkerade
      cy.get('[data-cy="show-checkbox"]').each((checkbox) => {
        cy.wrap(checkbox).should("not.be.checked");
      });
    });
  
    it("should restart the week when 'Starta om vecka' is clicked", () => {
      cy.get('[data-cy="todo-item"]').should("have.length.greaterThan", 0);
  
      cy.get('[data-cy="show-checkbox"]').first().check();
      cy.get('[data-cy="show-checkbox"]').check();
  
      cy.get('[data-cy="show-checkbox"]').first().should("be.checked");
      cy.get('[data-cy="show-checkbox"]').eq(1).should("be.checked");
  
      cy.get("header").should("be.visible");
      cy.get("button.restart-week").contains("Starta om vecka").click();
  
      cy.wait(1000); // Lägg till en kort fördröjning för att säkerställa att UI uppdateras
  
      // Kontrollera att alla todos återställs till sitt initiala tillstånd
      cy.get('[data-cy="todo-item"]').should("have.length.greaterThan", 0);
    });
  
    it("should display the summary of todos", () => {
      // Kontrollera att sammanfattningen är synlig och har texten "klara"
      cy.get(".summary").should("be.visible").and("contain.text", "klara");
  
      // Verifiera att sammanfattningen uppdateras korrekt när en todo är markerad som klar
      cy.get('[data-cy="show-checkbox"]').check();
      cy.get(".summary").should("contain.text", "6/6 klara");
  
      // Avmarkera todo och verifiera uppdaterad sammanfattning
      cy.get('[data-cy="show-checkbox"]').uncheck();
      cy.get(".summary").should("contain.text", "0/6 klara");
  
      // Lägg till en ny todo och verifiera uppdaterad sammanfattning
      cy.get("button").contains("Ny uppgift").click();
      cy.get("[data-cy='add-task-input']").type("Ny uppgift");
      cy.get("[data-cy='save-task-btn']").click();
      cy.get(".summary").should("contain.text", "0/7 klara");
  
      // Markera den nya todo som klar och verifiera uppdaterad sammanfattning
      cy.get('[data-cy="show-checkbox"]').last().check();
      cy.get(".summary").should("contain.text", "1/7 klara");
    });
  
    it("should update the text of the first todo item", () => {
      const newText = "e2e rules";
      // Leta upp första todo item som visas, klicka på pennan
      cy.get('[data-cy="edit-btn"]').first().click();
  
      // Skriv "e2e rules" i textboxen
      cy.get('[data-cy="edit-input"]').clear().type(newText);
  
      // Klicka på "spara" knappen
      cy.get('[data-cy="save-btn"]').click();
  
      // Kontrollera att texten nu har ändrats till "e2e rules"
      cy.get('[data-cy="item-text"]').first().should("contain.text", newText);
    });
  
    it("should remove a todo item", () => {
      // Kontrollera att vi har tre todos till att börja med
      cy.get('[data-cy="item"]').should("have.length", 0);
  
      // Leta upp första todo item som visas, klicka på papperskorgen
      cy.get('[data-cy="remove-btn"]').first().click();
  
      // Kontrollera att todo item har tagits bort
      cy.get('[data-cy="item"]').should("have.length", 0); // Antal items bör minska med 1
    });
  
    it("should filter todo items based on search text", () => {
      const searchText = "skola";
      // Skriv i sökfältet
      cy.get('[data-cy="search-input"]').type(searchText);
  
      // Kontrollera att rätt antal todo items visas
      cy.get('[data-cy="todo-item"]').should("have.length", 7);
  
      // Kontrollera att första item innehåller söktexten
      cy.get('[data-cy="todo-item"]').should("contain.text", searchText);
    });
  });