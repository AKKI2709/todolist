document.addEventListener('DOMContentLoaded', () => {
  const todoInput = document.getElementById('todo-input');
  const addBtn = document.getElementById('add-btn');
  const todoList = document.getElementById('todo-list');
  const totalTasks = document.getElementById('total-tasks');

  let tasks = [];

  function updateTotalTasks() {
    totalTasks.textContent = `Total Tasks: ${tasks.length}`;
  }

  function renderTasks() {
    todoList.innerHTML = '';

    tasks.forEach((task, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <input type="checkbox" class="checkbox" data-index="${index}" ${task.completed ? 'checked' : ''}>
        <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
        <button class="delete-btn" data-index="${index}">Delete</button>
      `;

      todoList.appendChild(li);
    });

    updateTotalTasks();
  }

  function addTask() {
    const text = todoInput.value.trim();

    if (text !== '') {
      const task = {
        text,
        completed: false,
      };

      tasks.push(task);
      renderTasks();
      todoInput.value = '';
    }
  }

  function toggleTaskCompleted(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
  }

  function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
  }

  todoInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  });

  addBtn.addEventListener('click', addTask);

  todoList.addEventListener('change', (e) => {
    if (e.target.matches('.checkbox')) {
      const index = e.target.dataset.index;
      toggleTaskCompleted(index);
    }
  });

  todoList.addEventListener('click', (e) => {
    if (e.target.matches('.delete-btn')) {
      const index = e.target.dataset.index;
      deleteTask(index);
    }
  });
});
