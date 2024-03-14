import { createTodoItem } from "./view.js";
import { localData } from "./constants.js";

export const appendLocalItems = (todoList) => {
  if (localData) {
    localData.forEach(element => {
      const todoItem = createTodoItem(element, localData);
      todoList.append(todoItem.item);
    });
  }
};
