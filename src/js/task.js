import * as utils from "./utils.js";
import * as storage from "./localStorage.js";

export function createTask(container, message, { isComplete = false, visible = true }) {
  const task = document.createElement("li");
  task.classList.add("todo__item", "task");
  task.setAttribute("data-visibility", visible ? "shown" : "hidden");

  if (isComplete) {
    task.classList.add("complete");
  }

  addButton("check", task, container);
  createDescription(task, message, container);
  addButton("del", task, container);

  container.prepend(task);
  storage.save(container);
}

function createDescription(task, message, container) {
  const text = document.createElement("p");
  text.classList.add("task__message");
  text.innerText = message;

  text.addEventListener("dblclick", function () {
    this.contentEditable = true;
    this.focus();
  });

  text.addEventListener("blur", function () {
    this.contentEditable = false;
    const newMessage = this.innerText
      .split("\n")
      .filter((line) => line)
      .map((line) => line.trim())
      .join("\n");

    if (newMessage.length) {
      this.innerText = newMessage;
    } else {
      this.parentNode.remove();
      storage.save(container);
      utils.updateAmountOfActiveTasks(container);
    }
  });

  task.appendChild(text);
}

function addButton(type, task, container) {
  const button = document.createElement("button");
  button.classList.add("task__button");

  const buttonImg = document.createElement("img");

  if (type === "check") {
    button.classList.add("task__status");
    buttonImg.classList.add("task__status-img");
    buttonImg.setAttribute("src", "images/check-mark.svg");
    buttonImg.setAttribute("alt", "Отметка завершенной задачи");

    button.addEventListener("click", () => {
      task.classList.toggle("complete");
      setTimeout(() => {
        if (
          (utils.category === "active" && task.classList.contains("complete")) ||
          (utils.category === "finished" && !task.classList.contains("complete"))
        ) {
          task.dataset.visibility = "hidden";
        }
      }, 800);

      storage.save(container);
      utils.updateAmountOfActiveTasks(container);
    });
  } else {
    button.classList.add("task__delete-button");
    buttonImg.classList.add("task__delete-img");
    buttonImg.setAttribute("src", "images/delete.svg");
    buttonImg.setAttribute("alt", "Кнопка удаления");

    button.addEventListener("click", () => {
      task.remove();
      storage.save(container);
      utils.updateAmountOfActiveTasks(container);
    });
  }

  button.append(buttonImg);
  task.append(button);
}
