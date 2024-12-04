import { useState } from "react";
import { useStore } from "../../data/store.js";

const Item = ({ item, handleChange, handleRemove, handleEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(item.text);
  const snoozeTodo = useStore((state) => state.snoozeTodo);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    handleEdit(newText);
    setIsEditing(false);
  };

  const handleSnoozeClick = () => {
    snoozeTodo(item.id);
  };

  let itemClass = "";
  if (item.done) itemClass += " done";
  if (item.late) itemClass += " due";

  return (
    <div className="item" data-cy="todo-item">
      <input
        data-cy="show-checkbox"
        type="checkbox"
        checked={item.done}
        onChange={handleChange}
      />
      {isEditing ? (
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          data-cy="edit-input"
        />
      ) : (
        <label className={itemClass} data-cy="item-text">
          {item.text}
        </label>
      )}
      <span title="Snooza" onClick={handleSnoozeClick} data-cy="snooza-btn">
        💤
      </span>
      {isEditing ? (
        <button onClick={handleSaveClick} data-cy="save-btn">
          Spara
        </button>
      ) : (
        <span title="Ändra" onClick={handleEditClick} data-cy="edit-btn">
          ✍️
        </span>
      )}
      <span title="Ta bort" onClick={handleRemove} data-cy="remove-btn">
        🗑️
      </span>
    </div>
  );
};

export default Item;