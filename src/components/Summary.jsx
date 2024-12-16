import { useStore } from "../data/store.js";

const Summary = () => {
  const todos = useStore((state) => state.todos);
  const completed = todos.filter((todo) => todo.done).length;
  const total = todos.length;

  return (
    <div className="summary" data-cy="summary">
      {completed}/{total} klara
    </div>
  );
};

export default Summary;