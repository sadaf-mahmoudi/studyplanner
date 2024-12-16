import { describe, it, expect, beforeEach } from "vitest";
import { act } from "@testing-library/react";
import { useStore } from "../data/store";

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
        day: "ti",
      },
      { id: 3, text: "Skriva rapport", done: false, late: true, day: "on" },
    ],
  });
});

describe("useStore Zustand store", () => {
  it("should toggle a todo", () => {
    act(() => {
      useStore.getState().toggleTodo(1);
    });
    const todos = useStore.getState().todos;
    expect(todos.find((t) => t.id === 1).done).toBe(true);
  });

  it("should remove a todo", () => {
    act(() => {
      useStore.getState().removeTodo(1);
    });
    const todos = useStore.getState().todos;
    expect(todos.length).toBe(2);
    expect(todos.find((t) => t.id === 1)).toBeUndefined();
  });

  it("should edit a todo", () => {
    const newText = "Uppdaterad text";
    act(() => {
      useStore.getState().editTodo(1, newText);
    });
    const todos = useStore.getState().todos;
    expect(todos.find((t) => t.id === 1).text).toBe(newText);
  });

  it("should add a new todo", () => {
    const newTodo = {
      id: 4,
      text: "Ny uppgift",
      done: false,
      late: false,
      day: "to",
    };
    act(() => {
      useStore.getState().addTodo(newTodo);
    });
    const todos = useStore.getState().todos;
    expect(todos.length).toBe(4);
    expect(todos.find((t) => t.id === 4)).toEqual(newTodo);
  });

  it("should reset todos", () => {
    act(() => {
      useStore.getState().resetTodos();
    });
    const todos = useStore.getState().todos;
    expect(todos.length).toBe(0);
  });

  it("should restart week with initial todos", () => {
    act(() => {
      useStore.getState().restartWeek();
    });
    const todos = useStore.getState().todos;
    expect(todos.length).toBe(6); // Assuming initialTodos has 3 items
  });

  it("should snooze a todo to the next day", () => {
    act(() => {
      useStore.getState().snoozeTodo(1);
    });
    const todos = useStore.getState().todos;
    expect(todos.find((t) => t.id === 1).day).toBe("ti");
  });

  it("should return the correct summary of todos", () => {
    const summary = useStore.getState().getTodoSummary();
    expect(summary.total).toBe(3);
    expect(summary.completed).toBe(1);
  });

  it("should mark all todos as not done when startNextWeek is called", () => {
    act(() => {
      useStore.getState().startNextWeek();
    });
    const todos = useStore.getState().todos;
    expect(todos.every((t) => !t.done)).toBe(true);
  });
});