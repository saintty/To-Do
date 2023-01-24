import * as storage from "./localStorage.js";

function showTasksByType(taskList, type) {
  for (let task of taskList.children) {
    if (type === "active" && task.classList.contains("complete")) {
      task.style.display = "none";
    } else if (type === "finished" && !task.classList.contains("complete")) {
      task.style.display = "none";
    } else {
      task.style.display = null;
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

function setSelectedType(buttons, selectedButton) {
  buttons.forEach((button) => button.classList.remove("todo__button_selected"));
  selectedButton.classList.add("todo__button_selected");
}

export function createControls(taskList) {
  const types = ["all", "active", "finished"];
  const buttons = [
    document.getElementById(`show-${types[0]}`),
    document.getElementById(`show-${types[1]}`),
    document.getElementById(`show-${types[2]}`),
  ];

  buttons.forEach((button, idx) => {
    button.addEventListener("click", () => {
      showTasksByType(taskList, types[idx]);
      setSelectedType(buttons, button);
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
