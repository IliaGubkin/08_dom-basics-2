export const createTodo = (newItem) => {
  fetch('http://192.168.0.104:5000/api/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newItem),
  })
}
