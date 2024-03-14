import { appendLocalItems } from "./localStorage.js";
import { localData } from "./constants.js";
import {getStorage, toggleChecked} from "./storageToggle.js"

import {
  createAppTitle,
  createTodoItemForm,
  createTodoList,
  handleSubmit,
} from "./view.js";

export function createTodoApp(container, title = "Список дел") {
  const todoAppTitle = createAppTitle(title);
  const todoItemForm = createTodoItemForm();
  const todoList = createTodoList();

  appendLocalItems(todoList);

  getStorage(todoList);
  container.append(todoAppTitle);
  container.append(todoItemForm.form);
  container.append(todoList);


  handleSubmit(todoItemForm, todoList,  localData ?? []);
}
