export const createItem = (newItem) => {
  fetch('http://10.9.3.83:5000/api/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newItem),
  })
}

export const getItems = async () => {
  const response = await fetch('http://10.9.3.83:5000/api/todos');
  const result = await response.json();

  return result;
};

export const deleteItem = async (id) => {
  fetch(`http://10.9.3.83:5000/api/todos/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
}


