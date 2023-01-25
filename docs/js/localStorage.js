import { createTask } from "./task.js";
import { updateAmountOfActiveTasks } from "./utils.js";

export function save(taskList) {
  const savedTasks = [];
  const tasks = [...taskList.children];

  for (let i = tasks.length - 1; i >= 0; --i) {
    const taskText = tasks[i].querySelector(".task__message").innerText;
    const isComplete = tasks[i].classList.contains("complete");
    savedTasks.push([taskText, isComplete]);
  }

  localStorage.setItem("todo task list", JSON.stringify(savedTasks));
}

export function load(taskList) {
  let savedTasks = localStorage.getItem("todo task list");

  if (savedTasks) {
    savedTasks = JSON.parse(savedTasks);

    savedTasks.forEach((task) => {
      createTask(taskList, task[0], {isComplete: task[1]});
    });
  }

  updateAmountOfActiveTasks(taskList);
}

