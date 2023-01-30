import * as utils from "./utils.js";
import * as storage from "./localStorage.js";

export const createTask = (
  container,
  message,
  { isComplete = false, isVisible = true }
) => {
  const task = document.createElement("li");
  task.classList.add("todo__item", "task");
  task.setAttribute("data-visibility", isVisible ? "shown" : "hidden");

  if (isComplete) {
    task.classList.add("complete");
  }

  addButton("check", task, container);
  addDescription(message, task, container);
  addButton("del", task, container);

  container.prepend(task);
};

const addDescription = (message, task, container) => {
  const description = document.createElement("p");
  description.classList.add("task__message");
  description.innerText = message;

  description.addEventListener("dblclick", editMessage);
  description.addEventListener("blur", (event) => {
    checkCorrectMessage(event, container);
  });

  task.appendChild(description);
};

const addButton = (type, task, container) => {
  const button = document.createElement("button");
  button.classList.add("task__button");

  if (type === "check") {
    button.classList.add("task__status");
    button.addEventListener("click", () => {
      finishTask(task, container);
    });
  } else {
    button.classList.add("task__delete");
    button.addEventListener("click", () => {
      removeTask(task, container);
    });
  }

  task.append(button);
};

const editMessage = (event) => {
  event.target.contentEditable = true;
  event.target.focus();
};

const checkCorrectMessage = (event, container) => {
  event.target.contentEditable = false;
  const newMessage = event.target.innerText
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line)
    .join("\n");

  if (newMessage.length) {
    event.target.innerText = newMessage;
  } else {
    event.target.parentNode.remove();
    utils.updateAmountOfActiveTasks(container);
  }

  storage.save(container);
};

const finishTask = (task, container) => {
  task.classList.toggle("complete");
  utils.setTaskVisibility(task);
  storage.save(container);
  utils.updateAmountOfActiveTasks(container);
};

const removeTask = (task, container) => {
  task.remove();
  storage.save(container);
  utils.updateAmountOfActiveTasks(container);
};
