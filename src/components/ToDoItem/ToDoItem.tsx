import React, { useState } from "react";
import { ToDoItemI } from "../../interfaces/ToDoItem";
import Button from "../ButtonComponent/Button";
import "./todoItem.scss";

const ToDoItem: React.FC<ToDoItemI> = ({
  id,
  task,
  done,
  handleUpdate,
  handleDone,
  handleRemove,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [updatedTask, setUpdatedTask] = useState<string>(task);

  const handleSave = () => {
    if (updatedTask.trim() !== "") {
      handleUpdate(id, updatedTask);
      setEditMode(false);
    }
  };

  return (
    <li className="todo-list__item" data-testid={`todo-item-${id}`}>
      {editMode ? (
        <>
          <input
            type="text"
            value={updatedTask}
            onChange={(e) => setUpdatedTask(e.target.value)}
            className="todo-list__item-edit-input"
            data-testid={`todo-item-${id}-edit-input`}
          />
          <Button
            onClick={handleSave}
            className="todo-list__item-save"
            testid={`todo-item-${id}-save`}
          >
            Save
          </Button>
        </>
      ) : (
        <>
          <span
            style={{
              textDecoration: done ? "line-through" : "none",
            }}
            className={`todo-list__item__task ${
              done && "todo-list__item-task--done"
            }`}
            data-testid={`todo-item-${id}-task`}
          >
            {task}
          </span>
          <Button
            onClick={() => handleDone(id)}
            className="todo-list__item__btn"
            testid={`todo-item-${id}-done`}
          >
            Done
          </Button>
          <Button
            onClick={() => setEditMode(true)}
            className="todo-list__item__btn"
            testid={`todo-item-${id}-edit`}
          >
            Edit
          </Button>
          <Button
            onClick={() => handleRemove(id)}
            className="todo-list__item__btn"
            testid={`todo-item-${id}-remove`}
          >
            Remove
          </Button>
        </>
      )}
    </li>
  );
};

export default ToDoItem;
