import { createTodoItem } from "./view.js";

export const getStorage = (todoList, keyName) => {
  let localData = localStorage.getItem(keyName);

  let todoItem = createTodoItem(JSON.parse(localData));
  todoList.append(todoItem.item);
};
