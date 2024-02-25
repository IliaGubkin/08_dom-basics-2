let listName = "my";

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

  // Расставляем атрибуты для элементов
  form.classList.add("input-group", "mb-3");
  input.classList.add("form-control");
  input.placeholder = "Введите название нового дела";
  buttonWrapper.classList.add("input-group-append");
  button.classList.add("btn", "btn-primary");
  button.textContent = "Добавить дело";

  button.disabled = true;

  // Объединяем элементы
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

  // Возвращаем результат
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

export const saveList = (arr, keyName) => {
  console.log(arr, keyName)
  localStorage.setItem(keyName, JSON.stringify(arr)); // Записываем в локалсторэдж массив в виде строки с данными списка
};

export const createTodoItem = (obj) => {
  // Кнопки помещаем в элемент, который красиво покажет их в одной группе
  let item = document.createElement("li");
  let buttonGroup = document.createElement("div");
  let doneButton = document.createElement("button");
  let deleteButton = document.createElement("button");

  // Устанавливаем стили для элемента списка
  item.classList.add(
    "list-group-item",
    "d-flex",
    "justify-content-between",
    "align-items-center"
  );
  
  item.textContent = obj.name;

  buttonGroup.classList.add("btn-group", "btn-group-sm");
  doneButton.classList.add("btn", "btn-success");
  doneButton.textContent = "Готово";
  deleteButton.classList.add("btn", "btn-danger");
  deleteButton.textContent = "Удалить";

  if (obj.done === true) {
    item.classList.add("list-group-item-success");
  }

  doneButton.addEventListener("click", function () {
    item.classList.toggle("list-group-item-success");

    // const currentName = item.firstChild.textContent; // Получаем текст без кнопок (текст первого элемента) Если использовать поиск по id, то эта переменная не нужна

    // Добавляем возможность изменения статуса done в массиве (до этого изменения происходили только в DOM) ----------------------------------------------- Этап 4 -----------------
    for (const listItem of JSON.parse(localStorage.getItem(listName))) {
      if (listItem.id === obj.id) {
        listItem.done = !listItem.done;
      }
    }
    saveList(JSON.parse(localStorage.getItem(listName)), listName); // Сохранение при изменении статуса дела ------------------------------------------------------------------------------------- Этап 5 -------------
  });

  deleteButton.addEventListener("click", function () {
    if (confirm("Вы уверены?")) {
      item.remove();
      console.log((localStorage.getItem(listName)))

    
    //     if (JSON.parse(localStorage.getItem(listName)).id === obj.id) {
    //     // localStorage.setItem(listName, {});
    // }
  }});

  // Вкладываем кнопки в отдельный элемент, чтобы они объединились в один блок
  buttonGroup.append(doneButton);
  buttonGroup.append(deleteButton);
  item.append(buttonGroup);

  // Возвращаем объект
  return {
    item,
    doneButton,
    deleteButton,
  };
};

export const handleSubmit = (todoItemForm, todoList) => {
  todoItemForm.form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!todoItemForm.input.value) {
      // value - забирает данные, введенные в поле
      return;
    }

    let newItem = {
      // Создаём переменную, которая будет хранить в себе уникальный id, объект с делом и статусом выполнения ----------------------------------------------------- Этап 3 --------
      id: Math.round(Math.random() * 1000),
      name: todoItemForm.input.value,
      done: false,
    };

    let todoItem = createTodoItem(newItem); // Помещаем в переменную результат выполнения функции; вместо todoItemForm.input.value используем newItem, т.к. перед этим создали переменную ---------Этап 3 --------

    localStorage.setItem(listName, JSON.stringify( newItem));
    todoList.append(todoItem.item); // с обработчиком кнопок
    todoItemForm.button.disabled = true; // Возвращаем значение для кнопки не активно после отправки значений ---------------------------------------------------- Этап 2 -----------
    todoItemForm.input.value = "";
  });
};
