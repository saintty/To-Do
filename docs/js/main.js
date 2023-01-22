import * as utils from "./utils.js";
import * as storage from "./localStorage.js";
import * as task from "./task.js";

function init() {
  const form = document.getElementById("form");
  const input = document.getElementById("input");
  const tasksList = document.getElementById("todo__list");

  storage.load(tasksList);

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (input.value !== "") {
      task.createTask(tasksList, input.value);
      input.value = "";
      storage.save(tasksList);
      utils.updateAmountOfActiveTasks(tasksList);
    }
  });

  utils.createControls(tasksList);

  if (window.innerWidth < 401) {
    input.setAttribute("placeholder", "Что выполнить?");
  }
}

window.onload = init;