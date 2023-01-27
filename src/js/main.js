import * as utils from "./utils.js";
import * as storage from "./localStorage.js";
import * as task from "./task.js";

function init() {
  const form = document.getElementById("form");
  const input = document.getElementById("input");
  const taskList = document.getElementById("todo__list");
  const inputHandler = handelInputMessage(input, taskList);

  storage.load(taskList);

  form.addEventListener("submit", inputHandler);
  input.addEventListener("blur", inputHandler);

  utils.createControls(taskList);

  if (window.innerWidth < 401) {
    input.setAttribute("placeholder", "Что выполнить?");
  }
}

function handelInputMessage(input, taskList) {
  return (event) => {
    event.preventDefault();

    if (input.value.trim() !== "") {
      task.createTask(taskList, input.value, {isVisible: utils.category !== "finished"});
      storage.save(taskList);
      utils.updateAmountOfActiveTasks(taskList);
    }

    input.value = "";
    input.focus();
  }
}

window.onload = init;
