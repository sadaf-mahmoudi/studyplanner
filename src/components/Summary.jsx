// src/components/Summary.jsx
import { useStore } from "../data/store";

const Summary = () => {
  const todos = useStore((state) => state.todos);
  const completedTodos = todos.filter((todo) => todo.done).length;
  const totalTodos = todos.length;
  const remainingTodos = totalTodos - completedTodos;

  return (
    <div className="summary">
      <span data-cy="total-todos">{totalTodos}</span>/
      <span data-cy="completed-todos">{completedTodos}</span> klara
      (<span data-cy="remaining-todos">{remainingTodos}</span> kvar)
    </div>
  );
};

export default Summary;