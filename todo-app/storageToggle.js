import { getItems } from "./api.js";
import { appendApiItems } from "./apiStorage.js";
import { appendLocalItems } from "./localStorage.js";

export let toggleChecked = false;

export const onToggleChange = async (event, todoList) => {
  todoList.innerHTML = ''

  if (event && event.currentTarget.checked) {
    await getItems();
    await appendApiItems(todoList);
    toggleChecked = true;
    return;
  }

  appendLocalItems(todoList);
  toggleChecked = false;
  return;
}

export const getStorage = (todoList) => {
  const storageToggle = document.getElementById('flexSwitchCheckDefault');
  storageToggle.addEventListener('click', () => onToggleChange(event, todoList));
}
