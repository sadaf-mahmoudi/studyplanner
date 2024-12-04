import { useState } from "react";
import Item from "./Item";
import { useStore } from "../../data/store.js";

const Day = ({ dayName, dayShortName, items = [] }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newTask, setNewTask] = useState("");
  const addTodo = useStore((state) => state.addTodo);

  const toggleTodo = useStore((state) => state.toggleTodo);
  const removeTodo = useStore((state) => state.removeTodo);
  const editTodo = useStore((state) => state.editTodo);

  const handleAddClick = () => {
    setIsAdding(true);
  };

  const handleSaveClick = () => {
    addTodo({
      id: new Date().getTime(),
      text: newTask,
      done: false,
      late: false,
      day: dayShortName,
    });
    setIsAdding(false);
    setNewTask("");
  };

  return (
    <div className="day">
      <h2 data-cy="show-dayname">{dayName}</h2>
      {items.map((item) => (
        <Item
          key={item.id}
          item={item}
          handleChange={() => toggleTodo(item.id)}
          handleRemove={() => removeTodo(item.id)}
          handleEdit={(newText) => editTodo(item.id, newText)}
        />
      ))}
      <div className="controls">
        <button data-cy="add-btn" onClick={handleAddClick}>
          Ny uppgift
        </button>
        {isAdding && (
          <div>
            <input
              data-cy="add-task-input"
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <button data-cy="save-task-btn" onClick={handleSaveClick}>
              Spara
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Day;