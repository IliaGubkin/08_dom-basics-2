import { getItems } from "./api.js";
import { createTodoItem } from "./view.js";

export const appendApiItems = async (todoList) => {
  const apiData = await getItems();

  if (apiData) {
    apiData.forEach(element => {
      const todoItem = createTodoItem(element, apiData);
      todoList.append(todoItem.item);
    });
  }
}
