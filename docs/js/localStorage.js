import { createTask } from "./task.js";
import { updateAmountOfActiveTasks } from "./utils.js";

export const save = (taskList) => {
  const savedTasks = [];
  const tasks = [...taskList.children];

  tasks.forEach((task) => {
    const taskText = task.querySelector(".task__message").innerText;
    const isComplete = task.classList.contains("complete");
    savedTasks.push([taskText, isComplete]);
  });

  localStorage.setItem("todo task list", JSON.stringify(savedTasks.reverse()));
};

export const load = (taskList) => {
  let savedTasks = localStorage.getItem("todo task list");

  if (savedTasks) {
    savedTasks = JSON.parse(savedTasks);

    savedTasks.forEach((task) => {
      createTask(taskList, task[0], { isComplete: task[1] });
    });
  }

  updateAmountOfActiveTasks(taskList);
};
