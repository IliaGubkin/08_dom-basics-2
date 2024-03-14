import { createTodoItem } from "./view.js";

export const getApiStorage = async () => {
  const response = await fetch('http://192.168.0.104:5000/api/todos');
  const result = await response.json();

  return result;
};

export const appendApiItems = async (todoList) => {
  const apiData = await getApiStorage();

  if (apiData) {
    apiData.forEach(element => {
      const todoItem = createTodoItem(element, apiData);
      todoList.append(todoItem.item);
    });
  }
}
