import { create } from "zustand";
import { todos as initialTodos } from "./data.js";
import { getToday } from "../utils/date.js";

const nextDayMap = {
  må: "ti",
  ti: "on",
  on: "to",
  to: "fr",
  fr: "lö",
  lö: "sö",
  sö: "må",
};

const useStore = create((set, get) => ({
  todos: initialTodos,
  todayName: getToday(),

  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      ),
    })),

  removeTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((t) => t.id !== id),
    })),

  editTodo: (id, newText) =>
    set((state) => ({
      todos: state.todos.map((t) =>
        t.id === id ? { ...t, text: newText } : t
      ),
    })),

  addTodo: (newTodo) =>
    set((state) => ({
      todos: [...state.todos, newTodo],
    })),

  resetTodos: () => set({ todos: [] }),

  restartWeek: () => set(() => ({ todos: initialTodos })),

  setTodos: (newTodos) => set({ todos: newTodos }),

  snoozeTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((t) =>
        t.id === id ? { ...t, day: nextDayMap[t.day] } : t
      ),
    })),

  getTodoSummary: () => {
    const todos = get().todos;
    const total = todos.length;
    const completed = todos.filter((t) => t.done).length;
    return { total, completed };
  },

  startNextWeek: () =>
    set((state) => ({
      todos: state.todos.map((t) => ({ ...t, done: false })),
    })),
}));

export { useStore };