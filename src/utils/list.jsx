import { useState } from "react";
import { useStore } from "../data/store.jsx";
import Item from "../components/day/Item.jsx";

export const splitTodosIntoDays = (todos) => {
  const days = [
    { name: "Måndag", shortName: "må", items: [] },
    { name: "Tisdag", shortName: "ti", items: [] },
    { name: "Onsdag", shortName: "on", items: [] },
    { name: "Torsdag", shortName: "to", items: [] },
    { name: "Fredag", shortName: "fr", items: [] },
    { name: "Lördag", shortName: "lö", items: [] },
    { name: "Söndag", shortName: "sö", items: [] },
  ];

  todos.forEach((todo) => {
    const day = days.find((d) => d.shortName === todo.day);
    if (day) {
      day.items.push(todo);
    }
  });

  return days;
};

const PrioList = () => {
  const todos = useStore((state) => state.todos);
  const [searchText, setSearchText] = useState("");

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const filteredTodos = todos.filter((todo) =>
    todo.text.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="prio-list">
      <h2 data-cy="search-title">Vad ska jag göra nu?</h2>
      <div className="list-container">
        <input
          type="text"
          placeholder="Sök efter uppgifter"
          value={searchText}
          onChange={handleSearch}
          data-cy="search-input"
        />
        {filteredTodos.length > 0 ? (
          filteredTodos.map((todo) => (
            <Item
              key={todo.id}
              item={todo}
              handleChange={() => useStore.getState().toggleTodo(todo.id)}
              handleRemove={() => useStore.getState().removeTodo(todo.id)}
              handleEdit={(newText) =>
                useStore.getState().editTodo(todo.id, newText)
              }
              data-cy="todo-item"
            />
          ))
        ) : (
          <p data-cy="no-todo">Inga uppgifter matchar din sökning.</p>
        )}
      </div>
    </div>
  );
};

export default PrioList;