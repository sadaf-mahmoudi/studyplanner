/* eslint-disable no-undef */
import Item from "../../src/components/day/Item";
import { useStore } from "../../src/data/store";

describe("Item Component", () => {
  const item = {
    id: 1,
    text: "Göra klart inlämning",
    done: false,
    late: false,
    day: "ti",
  };

  beforeEach(() => {
    useStore.setState({
      todos: [item],
      snoozeTodo: (id) => {
        const days = ['må', 'ti', 'on', 'to', 'fr', 'lö', 'sö'];
        const currentDayIndex = days.indexOf(item.day);
        const nextDayIndex = (currentDayIndex + 1) % days.length;
        item.day = days[nextDayIndex];
      }
    });
    
    cy.mount(
      <Item
        item={item}
        handleChange={() => useStore.getState().toggleTodo(item.id)}
        handleRemove={() => useStore.getState().removeTodo(item.id)}
        handleEdit={(newText) => useStore.getState().editTodo(item.id, newText)}
        handleSnooze={() => useStore.getState().snoozeTodo(item.id)}
      />
    );
  });

  it("should snooze the item to the next day", () => {
    cy.get('[data-cy="item-text"]').should("contain.text", "Göra klart inlämning");
    cy.get("[data-cy='snooza-btn']").click();
    cy.get('[data-cy="item-text"]').should("exist");
    cy.wrap(item).should("have.property", "day", "on");
  });

  it("should display the item text", () => {
    cy.get('[data-cy="item-text"]').contains(item.text);
  });

  it("should display the item as done when checkbox is checked", () => {
    const doneItem = { ...item, done: true };
    useStore.setState({
      todos: [doneItem],
    });
    cy.mount(<Item item={doneItem} />);
    cy.get('input[type="checkbox"]').should("be.checked");
  });

  it("should call handleChange when checkbox is clicked", () => {
    const handleChange = cy.stub().as("handleChange");
    cy.mount(<Item item={item} handleChange={handleChange} />);
    cy.get('input[type="checkbox"]').click();
    cy.get("@handleChange").should("have.been.calledOnce");
  });

  it("should remove an item when delete button is clicked", () => {
    const handleRemove = cy.stub().as("handleRemove");
    cy.mount(<Item item={item} handleRemove={handleRemove} />);
    cy.get('[data-cy="remove-btn"]').click();
    cy.get("@handleRemove").should("have.been.calledOnce");
  });

  it("should edit an item text", () => {
    const handleEdit = cy.stub().as("handleEdit");
    cy.mount(<Item item={item} handleEdit={handleEdit} />);
    const newText = "Uppdaterad text";

    cy.get('[data-cy="edit-btn"]').click();
    cy.get('[data-cy="edit-input"]').clear().type(newText);
    cy.get('[data-cy="save-btn"]').click();
    cy.get("@handleEdit").should("have.been.calledOnceWith", newText);
    cy.wait(500);
  });
});