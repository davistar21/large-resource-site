import $ from "../utils/querySelector.js";

$('form').addEventListener('submit', (e) => {
  e.preventDefault()
})

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'all'; // 'all', 'active', 'completed'

const taskList = document.getElementById('tasks');
const addButton = document.getElementById('add-task');
const taskInput = document.getElementById('new-task');
const filterButtons = document.querySelectorAll('.filters button');

taskInput.focus()
addButton.addEventListener('click', () => {
  const text = taskInput.value.trim();
  if (text !== "") {
    tasks.push({
      id: Date.now(),
      text,
      completed: false
    });
    taskInput.value = '';
    saveTasks();
    renderTasks();
  }
});

function renderTasks() {
  taskList.innerHTML = '';

  let filteredTasks = tasks;

  if (currentFilter === 'active') {
    filteredTasks = tasks.filter(task => !task.completed);
  } else if (currentFilter === 'completed') {
    filteredTasks = tasks.filter(task => task.completed);
  }

  filteredTasks.forEach(task => {
    const label = document.createElement('label');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => {
      task.completed = !task.completed;
      saveTasks();
      renderTasks();
    });

    const taskText = document.createElement('span');
    taskText.textContent = task.text;
    if (task.completed) {
      taskText.classList.add('completed')
      label.classList.add('completed')
    }
    
    const editBtn = document.createElement('button');
    editBtn.textContent = '🖉'; 
    editBtn.style.marginLeft = '10px';
    editBtn.addEventListener('click', () => {
      editTask(task, taskText);
    });
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '✖';
    deleteBtn.addEventListener('click', () => {
      tasks = tasks.filter(t => t.id !== task.id);
      saveTasks();
      renderTasks();
    });
    const checkMark = document.createElement('span');
    checkMark.classList.add('checkmark')
    label.appendChild(checkbox);
    label.appendChild(checkMark)
    label.appendChild(taskText);
    label.appendChild(editBtn)
    label.appendChild(deleteBtn);
    taskList.appendChild(label);
  });
}
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    currentFilter = btn.dataset.filter;
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderTasks();
  });
});


$('.clear-button').addEventListener('click', () => {
  tasks = [];
  saveTasks()
  renderTasks()
})
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
function editTask(task, taskTextElement) {
  const input = document.createElement('input');
  input.value = task.text;
  input.addEventListener('blur', () => {
    if (input.value !== task.text) {
      task.text = input.value.trim();
      saveTasks(); 
      renderTasks();
    }
  });
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      task.text = input.value.trim();
      saveTasks(); 
      renderTasks();
    }
  });

  // Replace the task text with the input field
  taskTextElement.replaceWith(input);
  input.focus();
}

renderTasks()