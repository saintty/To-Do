import * as storage from "./localStorage.js";

export let category = "all";

export function showTasksByCategory(taskList) {
  for (let task of taskList.children) {
    setTaskVisibility(task);
  }
}

function clearCompletedTasks(taskList) {
  const tasks = [...taskList.children];

  for (let i = tasks.length - 1; i >= 0; --i) {
    if (tasks[i].classList.contains("complete")) {
      tasks[i].remove();
    }
  }
}

export function setTaskVisibility(task) {
  if (
    (category === "active" && task.classList.contains("complete")) ||
    (category === "finished" && !task.classList.contains("complete"))
  ) {
    task.dataset.visibility = "hidden";
  } else {
    task.dataset.visibility = "shown";
  }
}

function checkAllTask(taskList) {
  const tasks = [...taskList.children];
  const isAllChecked = tasks.every((task) =>
    task.classList.contains("complete")
  );

  tasks.forEach((task) => {
    if (isAllChecked) {
      task.classList.remove("complete");
    } else {
      task.classList.add("complete");
    }

    setTimeout(() => {
      setTaskVisibility(task);
    }, 300);
  });
}

function getAmountOfActiveTasks(taskList) {
  return [...taskList.children].reduce((activeTask, task) => {
    return task.classList.contains("complete") ? activeTask : activeTask + 1;
  }, 0);
}

export function updateAmountOfActiveTasks(taskList) {
  const infoBar = document.getElementById("todo__info");
  const activeTasks = getAmountOfActiveTasks(taskList);

  if (activeTasks === 0) {
    infoBar.innerText = "Всё выполнено";
  } else if (activeTasks === 1) {
    infoBar.innerText = "1 задание осталось выполнить";
  } else if (activeTasks % 10 < 5) {
    infoBar.innerText = `${activeTasks} задания осталось выполнить`;
  } else {
    infoBar.innerText = `${activeTasks} заданий осталось выполнить`;
  }
}

function setSelectedCategory(buttons, selectedButton) {
  category = selectedButton.dataset.category;
  buttons.forEach((button) => button.classList.remove("todo__button_selected"));
  selectedButton.classList.add("todo__button_selected");
}

export function createControls(taskList) {
  const buttons = [...document.getElementsByClassName("todo__button-category")];

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      setSelectedCategory(buttons, button);
      showTasksByCategory(taskList);
    });
  });

  document.getElementById("clear-complete").addEventListener("click", () => {
    clearCompletedTasks(taskList);
    storage.save(taskList);
  });

  document.getElementById("check-all").addEventListener("click", () => {
    checkAllTask(taskList);
    storage.save(taskList);
    updateAmountOfActiveTasks(taskList);
  });
}
