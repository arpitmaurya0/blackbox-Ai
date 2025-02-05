// To-Do List functionality
document.getElementById('add-todo').addEventListener('click', () => {
    const todoInput = document.getElementById('todo-input');
    const todoText = todoInput.value.trim();
    if (todoText) {
        const li = document.createElement('li');
        li.innerHTML = `<input type="checkbox"> ${todoText}`;
        document.getElementById('todo-list').appendChild(li);
        todoInput.value = '';
    }
});