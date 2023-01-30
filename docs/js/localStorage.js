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

  localStorage.setItem("todoTaskList", JSON.stringify(savedTasks.reverse()));
};

export const load = (taskList) => {
  let savedTasks = localStorage.getItem("todoTaskList");

  if (savedTasks) {
    savedTasks = JSON.parse(savedTasks);

    savedTasks.forEach((task) => {
      createTask(taskList, task[0], { isComplete: task[1] });
    });
  }

  updateAmountOfActiveTasks(taskList);
};
