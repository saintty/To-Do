import * as storage from "./localStorage.js";

function showTasksByCategory(taskList, type) {
  for (let task of taskList.children) {
    if (
      type === "active" && task.classList.contains("complete") ||
      type === "finished" && !task.classList.contains("complete")
    ) {
      task.dataset.visibility = "hidden";
    } else {
      task.dataset.visibility = "show";
    }
  }
}

function clearCompletedTasks(taskList) {
  const tasks = taskList.childNodes;

  for (let i = tasks.length - 1; i >= 0; --i) {
    if (tasks[i].classList.contains("complete")) {
      tasks[i].remove();
    }
  }
  storage.save(taskList);
}

function checkAllTask(taskList) {
  const tasks = [...taskList.children];
  const checkedAll = tasks.every((task) => {
    return task.style.display !== "none" ? task.classList.contains("complete") : true;
  });

  if (checkedAll) {
    tasks.forEach((task) => {
      if (task.style.display !== "none") {
        task.classList.remove("complete");
      }
    });
  }
  else {
    tasks.forEach((task) => {
      if (task.style.display !== "none") {
        task.classList.add("complete");
      }
    });
  }

  storage.save(taskList);
}

function getAmountOfActiveTasks(taskList) {
  let activeTasks = 0;
  [...taskList.children].forEach((task) => {
    if (!task.classList.contains("complete")) {
      activeTasks += 1;
    }
  });

  return activeTasks;
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
  buttons.forEach((button) => button.classList.remove("todo__button_selected"));
  selectedButton.classList.add("todo__button_selected");
}

export function createControls(taskList) {
  const buttons = [...document.getElementsByClassName("todo__button-category")];

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      showTasksByCategory(taskList, button.dataset.category);
      setSelectedCategory(buttons, button);
    });
  });

  document.getElementById("clear-complete").addEventListener("click", () => {
    clearCompletedTasks(taskList);
  });

  document.getElementById("check-all").addEventListener("click", () => {
    checkAllTask(taskList);
    updateAmountOfActiveTasks(taskList);
  });
}
