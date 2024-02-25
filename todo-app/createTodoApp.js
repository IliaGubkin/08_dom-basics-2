import { getStorage } from "./localStorage.js";
import {
  createAppTitle,
  createTodoItemForm,
  createTodoList,
  handleSubmit,
} from "./view.js";

export function createTodoApp(container, title = "Список дел", keyName) {
  let todoAppTitle = createAppTitle(title);
  let todoItemForm = createTodoItemForm();
  let todoList = createTodoList();

  container.append(todoAppTitle);
  container.append(todoItemForm.form);
  container.append(todoList);

  getStorage(todoList, keyName);
  handleSubmit(todoItemForm, todoList);
}
