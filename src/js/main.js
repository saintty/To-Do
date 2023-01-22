import * as utils from "./utils.js";
import * as storage from "./localStorage.js";
import * as task from "./task.js";

function init() {
  const form = document.getElementById("form");
  const input = document.getElementById("input");
  const taskList = document.getElementById("todo__list");

  storage.load(taskList);

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (input.value !== "") {
      task.createTask(taskList, input.value);
      input.value = "";
      storage.save(taskList);
      utils.updateAmountOfActiveTasks(taskList);
    }
  });

  utils.createControls(taskList);

  if (window.innerWidth < 401) {
    input.setAttribute("placeholder", "Что выполнить?");
  }
}

window.onload = init;
