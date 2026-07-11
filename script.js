console.log("bruh");
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
console.log(taskToDo)


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
  /*
    console.log(title.value);
    console.log(description.value);
    console.log(priority.value);
    console.log(date.value); */

    const taskCard = document.createElement('div');
    taskCard.classList.add("task-card");
    const taskTitle = title.value;
    const taskDescription = description.value;
    const taskPriority = priority.value;
    const taskDate = date.value;

    taskCard.innerHTML = `
    <h3>${taskTitle}</h3>

    <p>${taskDescription}</p>

    <div class="task-footer">

        <span>${taskPriority}</span>

        <span>${taskDate}</span>

    </div>
    `;
    taskToDo.appendChild(taskCard);
}})




