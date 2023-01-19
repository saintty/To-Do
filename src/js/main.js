function createCheckButton(button) {
  button.addEventListener("click", () => {
    button.parentNode.classList.toggle("task_complete");
    saveTasksInLocalStorage();
  });
}

function createDeleteButton(button) {
  button.addEventListener("click", () => {
    button.parentNode.remove();
    saveTasksInLocalStorage();
  });
}

function createTask(taskText, isComplete = false) {
  const task = document.createElement("li");
  task.classList.add("todo__item", "task");

  if (isComplete) {
    task.classList.add("task_complete");
  }

  const checkButton = document.createElement("button");
  checkButton.classList.add("task__status", "task__button");
  createCheckButton(checkButton);

  const text = document.createElement("p");
  text.classList.add("task__message");
  text.innerText = taskText;

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("task__delete-button", "task__button");
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
    const taskText = task.querySelector(".task__message").innerText;
    const isComplete = task.classList.contains("task_complete");
    savedTasks.push([taskText, isComplete]);
  });

  localStorage.setItem("todo list tasks", JSON.stringify(savedTasks));
}

function loadTasksFromLocalStorage(tasksList) {
  let savedTasks = localStorage.getItem("todo list tasks");

  if (savedTasks) {
    savedTasks = JSON.parse(savedTasks);

    savedTasks.forEach((task) => {
      const taskText = task[0];
      const isComplete = task[1];

      tasksList.appendChild(createTask(taskText, isComplete));
    });
  }
}

function showTaskByType(taskList, type) {
  for (let task of taskList.children) {
    if (type === "active" && task.classList.contains("task_complete")) {
      task.style.display = "none";
    }
    else if (type === "finished" && !task.classList.contains("task_complete")) {
      task.style.display = "none";
    }
    else {
      task.style.display = null;
    }
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

  const allTasksButton = document.getElementById("todo__button_all");
  allTasksButton.addEventListener("click", () => { showTaskByType(tasksList, "all"); });

  const activeTasksButton = document.getElementById("todo__button_active");
  activeTasksButton.addEventListener("click", () => { showTaskByType(tasksList, "active"); });

  const finishedTasksButton = document.getElementById("todo__button_finished");
  finishedTasksButton.addEventListener("click", () => { showTaskByType(tasksList, "finished"); });
}

window.onload = init;
