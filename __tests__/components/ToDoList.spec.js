import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import ToDoList from "../../src/components/ToDoList";

global.React = React;

describe("ToDoList component", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should render the initial list of tasks from localStorage", () => {
    const tasks = [
      { id: 1, task: "Task 1", done: false },
      { id: 2, task: "Task 2", done: false },
      { id: 3, task: "Task 3", done: false },
    ];
    localStorage.setItem("todos", JSON.stringify(tasks));

    const { getByTestId } = render(<ToDoList />);

    expect(getByTestId("todo-item-1-task")).toHaveTextContent("Task 1");
    expect(getByTestId("todo-item-2-task")).toHaveTextContent("Task 2");
    expect(getByTestId("todo-item-3-task")).toHaveTextContent("Task 3");
  });

  it("should add a new task when the Add button is clicked", () => {
    const { getByTestId } = render(<ToDoList />);

    const input = getByTestId("task-input");
    const addButton = getByTestId("add-button");

    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.click(addButton);

    expect(getByTestId("todo-item-1-task")).toHaveTextContent("New Task");
  });

  it("should mark a task as done when the Done button is clicked", () => {
    const tasks = [{ id: 1, task: "Task 1", done: false }];
    localStorage.setItem("todos", JSON.stringify(tasks));

    const { getByTestId } = render(<ToDoList />);

    const doneButton = getByTestId("todo-item-1-done");

    fireEvent.click(doneButton);

    expect(getByTestId("todo-item-1-task")).toHaveStyle(
      "text-decoration: line-through"
    );
    expect(JSON.parse(localStorage.getItem("todos") || "")[0].done).toEqual(
      true
    );
  });

  it("should edit a task when the Edit button is clicked", () => {
    const tasks = [{ id: 1, task: "Task 1", done: false }];
    localStorage.setItem("todos", JSON.stringify(tasks));

    const { getByTestId } = render(<ToDoList />);

    const editButton = getByTestId("todo-item-1-edit");
    fireEvent.click(editButton); // add this line
    const editInput = getByTestId("todo-item-1-edit-input");

    fireEvent.change(editInput, { target: { value: "Edited Task" } });
    fireEvent.click(getByTestId("todo-item-1-save"));

    expect(getByTestId("todo-item-1-task")).toHaveTextContent("Edited Task");
    expect(JSON.parse(localStorage.getItem("todos") || "")[0].task).toEqual(
      "Edited Task"
    );
  });

  it("should remove a task when the Remove button is clicked", () => {
    const tasks = [{ id: 1, task: "Task 1", done: false }];
    localStorage.setItem("todos", JSON.stringify(tasks));

    const { getByTestId, queryByTestId } = render(<ToDoList />);

    const removeButton = getByTestId("todo-item-1-remove");

    fireEvent.click(removeButton);

    expect(queryByTestId("todo-item-1-task")).not.toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem("todos") || "")).toHaveLength(0);
  });
});
