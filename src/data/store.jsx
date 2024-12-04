import { create } from 'zustand'

export const useStore = create((set) => ({
  todos: [],
  addTodo: (todo) => set((state) => ({ 
    todos: [...state.todos, todo] 
  })),
  toggleTodo: (id) => set((state) => ({
    todos: state.todos.map((todo) =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ),
  })),
  removeTodo: (id) => set((state) => ({
    todos: state.todos.filter((todo) => todo.id !== id),
  })),
  editTodo: (id, newText) => set((state) => ({
    todos: state.todos.map((todo) =>
      todo.id === id ? { ...todo, text: newText } : todo
    ),
  })),
  snoozeTodo: (id) => set((state) => ({
    todos: state.todos.map((todo) =>
      todo.id === id ? { ...todo, late: !todo.late } : todo
    ),
  })),
  restartWeek: () => set((state) => ({
    todos: state.todos.map((todo) => ({ ...todo, done: false })),
  })),
  startNextWeek: () => set((state) => ({
    todos: state.todos.map((todo) => ({ ...todo, done: false })),
  })),
}))