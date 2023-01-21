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
  const checkedAll = tasks.every((task) => task.classList.contains("complete"));

  if (checkedAll) {
    tasks.forEach((task) => {
      task.classList.remove("complete");
    });
  }
  else {
    tasks.forEach((task) => {
      task.classList.add("complete");
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

export function createControls(taskList) {
  const types = ["all", "active", "finished"];

  types.forEach((type) => {
    document.getElementById(`show-${type}`).addEventListener("click", () => {
      showTasksByType(taskList, type);
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

//  ДОБАВЛЯТЬ ЗАДАНИЯ В НАЧАЛО СПИСКА
  