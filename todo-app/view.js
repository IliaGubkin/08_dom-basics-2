import { createItem, deleteItem } from "./api.js";
import { toggleChecked } from "./storageToggle.js";

const listName = "my";

export const createAppTitle = (title) => {
  let appTitle = document.createElement("h2");
  appTitle.innerHTML = title;
  return appTitle;
};

export const createTodoItemForm = () => {
  let form = document.createElement("form");
  let input = document.createElement("input");
  let buttonWrapper = document.createElement("div");
  let button = document.createElement("button");

  form.classList.add("input-group", "mb-3");
  input.classList.add("form-control");
  input.placeholder = "Введите название нового дела";
  buttonWrapper.classList.add("input-group-append");
  button.classList.add("btn", "btn-primary");
  button.textContent = "Добавить дело";

  button.disabled = true;

  buttonWrapper.append(button);
  form.append(input);
  form.append(buttonWrapper);

  input.addEventListener("input", function () {
    if (input.value !== "") {
      button.disabled = false;
    } else {
      button.disabled = true;
    }
  });

  return {
    form,
    input,
    button,
  };
};

export const createTodoList = () => {
  let list = document.createElement("ul");
  list.classList.add("list-group");
  return list;
};

export const createTodoItem = (todoItem, localData) => {
  let item = document.createElement("li");
  let buttonGroup = document.createElement("div");
  let doneButton = document.createElement("button");
  let deleteButton = document.createElement("button");

  item.classList.add(
    "list-group-item",
    "d-flex",
    "justify-content-between",
    "align-items-center"
  );

  item.textContent = todoItem.name;

  buttonGroup.classList.add("btn-group", "btn-group-sm");
  doneButton.classList.add("btn", "btn-success");
  doneButton.textContent = "Готово";
  deleteButton.classList.add("btn", "btn-danger");
  deleteButton.textContent = "Удалить";

  if (todoItem.done === true) {
    item.classList.add("list-group-item-success");
  }

  doneButton.addEventListener("click", function () {
    item.classList.toggle("list-group-item-success");

    for (const listItem of localData) {
      if (listItem.id === todoItem.id) {
        listItem.done = !listItem.done;
      }
    }
    localStorage.setItem(listName, JSON.stringify(localData));
  });

  deleteButton.addEventListener("click", async function () {
    const localData = JSON.parse(localStorage.getItem(listName));
    let storage = localData;
    storage = storage.filter((listItem) => listItem.id !== todoItem.id);

    if (confirm("Вы уверены?")) {
      item.remove();
      if (toggleChecked) {
        deleteItem(todoItem.id);
      } else {
        localStorage.setItem(listName, JSON.stringify(storage));
      }
    }
  });

  buttonGroup.append(doneButton);
  buttonGroup.append(deleteButton);
  item.append(buttonGroup);

  return {
    item,
    doneButton,
    deleteButton,
  };
};

export const handleSubmit = (todoItemForm, todoList, localData) => {
  todoItemForm.form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!todoItemForm.input.value) {
      return;
    }

    let newItem = {
      id: Math.round(Math.random() * 1000),
      name: todoItemForm.input.value,
      done: false,
    };

    let todoItem = createTodoItem(newItem, localData);

    if (toggleChecked) {
      createItem(newItem);
    } else {
      localData.push(newItem);
    }

    localStorage.setItem(listName, JSON.stringify(localData));
    todoList.append(todoItem.item);
    todoItemForm.button.disabled = true;
    todoItemForm.input.value = "";
  });
};
