import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ToDoItem from "../../src/components/ToDoItem";

describe("ToDoItem component", () => {
  const handleUpdate = jest.fn();
  const handleDone = jest.fn();
  const handleRemove = jest.fn();
  const props = {
    id: 1,
    task: "Do the laundry",
    done: false,
    handleUpdate,
    handleDone,
    handleRemove,
  };

  test("renders the task", () => {
    const { getByTestId } = render(<ToDoItem {...props} />);
    const taskElement = getByTestId("todo-item-1-task");
    expect(taskElement).toBeInTheDocument();
    expect(taskElement.textContent).toBe("Do the laundry");
  });

  test("calls handleDone when Done button is clicked", () => {
    const { getByTestId } = render(<ToDoItem {...props} />);
    const doneButton = getByTestId("todo-item-1-done");
    fireEvent.click(doneButton);
    expect(handleDone).toHaveBeenCalledWith(1);
  });

  test("toggles edit mode when Edit button is clicked", () => {
    const { getByTestId } = render(<ToDoItem {...props} />);
    const editButton = getByTestId("todo-item-1-edit");
    fireEvent.click(editButton);
    const editInput = getByTestId("todo-item-1-edit-input");
    expect(editInput).toBeInTheDocument();
  });

  test("calls handleUpdate when Save button is clicked in edit mode", () => {
    const { getByTestId } = render(<ToDoItem {...props} />);
    const editButton = getByTestId("todo-item-1-edit");
    fireEvent.click(editButton);
    const saveButton = getByTestId("todo-item-1-save");
    fireEvent.click(saveButton);
    expect(handleUpdate).toHaveBeenCalledWith(1, "Do the laundry");
  });

  test("calls handleRemove when Remove button is clicked", () => {
    const { getByTestId } = render(<ToDoItem {...props} />);
    const removeButton = getByTestId("todo-item-1-remove");
    fireEvent.click(removeButton);
    expect(handleRemove).toHaveBeenCalledWith(1);
  });
});
