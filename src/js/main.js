function init() {
  const form = document.getElementById("form");
  const input = document.getElementById("input");
  const tasksList = document.getElementById("todo__list");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const taskText = input.value;
    const taskHTML = `<li class="todo__item task">
    <button class="task__status"></button>
    <p class="task__message">${taskText}</p>
    <button class="task__delete-button">
    <img class="task__delete-img" src="images/delete.svg" alt="Крест кнопки удаления">
    </button>
    </li>`;

    tasksList.insertAdjacentHTML("beforeend", taskHTML);
    input.value = "";
  });

  const checkButtons = document.getElementsByClassName("task__status");
  [...checkButtons].forEach((button) => {
    button.addEventListener("click", () => {
      button.parentNode.classList.toggle("task_complete");
    });
  });
}

window.onload = init;
