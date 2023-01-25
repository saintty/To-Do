import { createTask } from "./task.js";
import { updateAmountOfActiveTasks } from "./utils.js";

export function save(tasksList) {
  const savedTasks = [];
  const tasks = [...tasksList.children];

  for (let i = tasks.length - 1; i >= 0; --i) {
    const taskText = tasks[i].querySelector(".task__message").innerText;
    const isComplete = tasks[i].classList.contains("complete");
    savedTasks.push([taskText, isComplete]);
  }

  localStorage.setItem("todo list tasks", JSON.stringify(savedTasks));
}

export function load(tasksList) {
  let savedTasks = localStorage.getItem("todo list tasks");

  if (savedTasks) {
    savedTasks = JSON.parse(savedTasks);

    savedTasks.forEach((task) => {
      createTask(tasksList, task[0], {isComplete: task[1]});
    });
  }

  updateAmountOfActiveTasks(tasksList);
}

