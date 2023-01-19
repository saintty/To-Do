function createCheckButton(button) {
  button.addEventListener("click", () => {
    button.parentNode.classList.toggle("task_complete");
  });
}

function createDeleteButton(button) {
  button.addEventListener("click", () => {
    button.parentNode.remove();
  });
}

function createTask(taskText) {
  const task = document.createElement("li");
  task.classList.add("todo__item", "task");

  const checkButton = document.createElement("button");
  checkButton.classList.add("task__status");
  createCheckButton(checkButton);

  const text = document.createElement("p");
  text.classList.add("task__message");
  text.innerText = taskText;

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("task__delete-button");
  createDeleteButton(deleteButton);

  const deleteButtonImg = document.createElement("img");
  deleteButtonImg.classList.add("task__delete-img");
  deleteButtonImg.setAttribute("src", "images/delete.svg");
  deleteButtonImg.setAttribute("alt", "Крест кнопки удаления");
  deleteButton.appendChild(deleteButtonImg);

  task.appendChild(checkButton);
  task.appendChild(text);
  task.appendChild(deleteButton);

  return task;
}

function saveTasksInLocalStorage() {
  const savedTasks = [];
  const tasks = [...document.getElementsByClassName("task")];

  tasks.forEach((task) => {
    savedTasks.push(task.querySelector(".task__message").innerText);
  });

  localStorage.setItem("todo list tasks", savedTasks);
}

function loadTasksFromLocalStorage(tasksList) {
  const savedTasks = localStorage.getItem("todo list tasks");

  if (savedTasks) {
    savedTasks.split(",").forEach((task) => {
      tasksList.appendChild(createTask(task));
    });
  }
}

function init() {
  const form = document.getElementById("form");
  const input = document.getElementById("input");
  const tasksList = document.getElementById("todo__list");

  loadTasksFromLocalStorage(tasksList);

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (input.value !== "") {
      tasksList.appendChild(createTask(input.value));
      input.value = "";
      saveTasksInLocalStorage();
    }
  });
}

window.onload = init;
