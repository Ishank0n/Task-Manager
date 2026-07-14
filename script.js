// Dark Theme Toggle // 

const themeToggle = document.querySelector('.theme-toggle');
const root = document.documentElement;

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  root.setAttribute('data-theme', savedTheme);
} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  root.setAttribute('data-theme', 'dark');
}
updateToggleIcon();

themeToggle.addEventListener('click', () => {
  const isDark = root.getAttribute('data-theme') === 'dark';
  const next = isDark ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateToggleIcon();
});

function updateToggleIcon() {
  const isDark = root.getAttribute('data-theme') === 'dark';
  themeToggle.textContent = isDark ? '☀️' : '🌙';
}

//Rest of the code//

let draggedTaskData = null;
let draggedTask = null;
let editingTask = null;
let tasks = JSON.parse(localStorage.getItem('myTasks')) || [];
let cancel = document.querySelector('.cancel-btn');
let modal = document.querySelector('.modal');
let overlay = document.querySelector('.overlay');
let addBtn = document.querySelectorAll('.add-btn');
let createBtn = document.querySelector('.create-btn');
let title = document.querySelector('.task-title');
let description = document.querySelector('.task-description');
let priority = document.querySelector('.priority');
let date = document.querySelector('.due-date');
let error = document.querySelector('.error');
let taskToDo = document.querySelector('.tasks');
let taskContainer = document.querySelectorAll('.tasks');
let toDo = document.querySelector('.tasks-todo')
let doing = document.querySelector('.tasks-doing')
let done = document.querySelector('.tasks-done')
let themeBtn = document.querySelector(".theme-btn");

tasks.forEach((task) => {
  taskCreation(task);
})

taskContainer.forEach((container) =>  {
  container.addEventListener('dragover', (e) => {
    e.preventDefault();
  });

  container.addEventListener('drop', ()=>{
  container.appendChild(draggedTask);
  draggedTaskData.status = container.dataset.status;
  localStorage.setItem("myTasks", JSON.stringify(tasks));
  })
  
})

function taskCreation(task){
  const taskCard = document.createElement('div');
  taskCard.classList.add("task-card");
  taskCard.draggable = true;
  
  taskCard.addEventListener('dragstart',()=>{
    draggedTask = taskCard;
    draggedTaskData = task;
    console.log(draggedTask);
  })

  taskCard.innerHTML = `
  <h3>${task.title}</h3>

  <p>${task.description}</p>

  <div class="task-footer">

      <span class="priority-tag" data-priority="${task.priority}">${task.priority}</span>
      <span class="date-tag">${task.date}</span>
      <button class='edit'>✏️</button>
      <button class='delete'>🗑️</button>

  </div>`;

    let taskEdit = taskCard.querySelector('.edit')
    taskEdit.addEventListener('click', ()=>{
      modal.classList.remove('hidden');
      overlay.classList.remove('hidden');
      editingTask = task;

      title.value = task.title;
      description.value = task.description;
      priority.value = task.priority;
      date.value = task.date;
      createBtn.textContent = "Save Changes";
    })

    const taskDelete = taskCard.querySelector('.delete');
    taskDelete.addEventListener('click', ()=>{
    taskCard.remove()
    tasks = tasks.filter((i) => {
      return i !== task;});
      localStorage.setItem("myTasks", JSON.stringify(tasks));
    });

  if (task.status === 'todo'){
  toDo.appendChild(taskCard);
  }else if (task.status === 'doing'){
    doing.appendChild(taskCard);
  }else if (task.status === 'done'){
    done.appendChild(taskCard);
  }}

addBtn.forEach((button) => {
  button.addEventListener('click', ()=> {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
})
})

cancel.addEventListener('click', ()=>{
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
  createBtn.textContent = "Create Task";
  editingTask = null;
})

createBtn.addEventListener('click', ()=>{
  
  if(title.value === ''){
    error.innerHTML = 'Add a valid title!';
    title.style.border = '1px solid red';
  }else{
    title.style.border = '';
    error.innerHTML = '';

      if(editingTask === null){
        const newTask = {
        title: title.value,
        description: description.value,
        priority: priority.value,
        date: date.value,
        status: 'todo'
        };

        tasks.push(newTask);
        localStorage.setItem("myTasks", JSON.stringify(tasks));
          
        taskCreation(newTask);
        
        title.value = '';
        description.value = '';
        date.value = '';
        modal.classList.add("hidden");
        overlay.classList.add("hidden");
      }else{
        editingTask.title = title.value;
        editingTask.description = description.value;
        editingTask.priority = priority.value;
        editingTask.date = date.value;}
        localStorage.setItem("myTasks", JSON.stringify(tasks));
        createBtn.textContent = "Create Task";
        editingTask = null;
        location.reload();
      }
    
        
})






