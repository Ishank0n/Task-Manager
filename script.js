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

tasks.forEach((task) => {
  taskCreation(task);
})

function taskCreation(task){
  const taskCard = document.createElement('div');
  taskCard.classList.add("task-card");

  taskCard.innerHTML = `
  <h3>${task.title}</h3>

  <p>${task.description}</p>

  <div class="task-footer">

      <span>${task.priority}</span>

      <span>${task.date}</span>

      <button class='delete'>🗑️</button>

  </div>`;

      const taskDelete = taskCard.querySelector('.delete');
      taskDelete.addEventListener('click', ()=>{
      taskCard.remove()
      tasks = tasks.filter((i) => {
        return i !== task;});
        localStorage.setItem("myTasks", JSON.stringify(tasks));
      });

      taskToDo.appendChild(taskCard);}

addBtn.forEach((button) => {
  button.addEventListener('click', ()=> {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
})
})

cancel.addEventListener('click', ()=>{
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
})

createBtn.addEventListener('click', ()=>{

  if(title.value === ''){
    error.innerHTML = 'Add a valid title!';
    title.style.border = '1px solid red';
  }else{
    title.style.border = '';
    error.innerHTML = '';

    const newTask = {
    title: title.value,
    description: description.value,
    priority: priority.value,
    date: date.value
    };
    
    tasks.push(newTask);
    localStorage.setItem("myTasks", JSON.stringify(tasks));
      
    taskCreation(newTask);
    
    title.value = '';
    description.value = '';
    date.value = '';
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
}})







