export interface ToDoItemI {
  id: number;
  task: string;
  done: boolean;
  handleUpdate: (id: number, updatedTask: string) => void;
  handleDone: (id: number) => void;
  handleRemove: (id: number) => void;
}
