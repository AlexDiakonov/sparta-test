import React, { useEffect, useState } from "react";
import { ToDo } from "../../interfaces/toDoList";
import Button from "../ButtonComponent/Button";
import ToDoItem from "../ToDoItem";
import "./toDoList.scss";

const ToDoList: React.FC = () => {
  const [todos, setTodos] = useState<ToDo[]>(
    JSON.parse(localStorage.getItem("todos") || "[]")
  );

  const [task, setTask] = useState("");

  const handleAdd = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (task.trim() !== "") {
      const newTodo: ToDo = {
        id: todos.length + 1,
        task,
        done: false,
      };
      setTodos([...todos, newTodo]);
      setTask("");
    }
  };

  useEffect(() => {
    setTodos(JSON.parse(localStorage.getItem("todos") || "[]"));
  }, []);

  useEffect(() => {
    if (todos.length >= 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  const handleUpdate = (id: number, updatedTask: string) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, task: updatedTask } : todo
    );
    setTodos(updatedTodos);
  };

  const handleDone = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    );
    setTodos(updatedTodos);
  };

  const handleRemove = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <div className="todo-list" data-testid="todo-list">
      <form className="todo-list__form" onSubmit={handleAdd} action="">
        <input
          className="todo-list__input"
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add new task"
          data-testid="task-input"
        />
        <Button
          className="todo-list__addButton"
          type="submit"
          testid="add-button"
        >
          Add
        </Button>
      </form>

      <ul className="todo-list__list">
        {todos.map((todo) => (
          <ToDoItem
            key={todo.id}
            id={todo.id}
            task={todo.task}
            done={todo.done}
            handleUpdate={handleUpdate}
            handleDone={handleDone}
            handleRemove={handleRemove}
            data-testid={`todo-item-${todo.id}`}
          />
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
