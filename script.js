const userIp = document.getElementById("todoIp");
const addBtn = document.getElementById("formBtn");
const todoIpForm = document.getElementById("todoListIp");
const todoOptions = document.querySelector(".form-select");
const todoListCont = document.querySelector(".todoContainer");

document.addEventListener("DOMContentLoaded", getTodos);
todoIpForm.addEventListener("submit", addTask);
todoListCont.addEventListener("click", checkRemove);
todoOptions.addEventListener("click", filterTodo);

function addTask(e) {
  // Prevent form from submission.
  e.preventDefault();
  // console.log("first");

  const taskContainer = document.createElement("div");

  const taskName = userIp.value;
  const taskElement = document.createElement("p");
  taskElement.innerText = taskName;
  taskElement.classList.add("taskElement");

  const completeBtn = document.createElement("button");
  completeBtn.innerText = "Completed";
  completeBtn.classList.add("completeButton");
  completeBtn.classList.add("btn");
  completeBtn.classList.add("btn-warning");

  const removeBtn = document.createElement("button");
  removeBtn.innerText = "Remove Task";
  removeBtn.classList.add("removeButton");
  removeBtn.classList.add("btn");
  removeBtn.classList.add("btn-danger");

  taskContainer.appendChild(taskElement);
  taskContainer.appendChild(completeBtn);
  taskContainer.appendChild(removeBtn);

  // This is used to store item in localstorage.
  saveLocalTodos(taskName);

  taskContainer.classList.add("todo-container");

  todoListCont.appendChild(taskContainer);
}

function checkRemove(e) {
  // It will target the button.
  const todoTask = e.target;

  if (todoTask.classList[0] === "removeButton") {
    const todo = todoTask.parentElement;
    // console.log(todo);
    todo.classList.add("fall");
    removeLocalTodos(todo);
    // This event will be applied after the transition complete.
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  } else if (todoTask.classList[0] === "completeButton") {
    // to apply class on the whole div.
    const todo = todoTask.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(e) {
  const filterButtonClicked = e.target.value;
  // It will return all the child in an array.
  const todos = todoListCont.childNodes;
  // console.log(todos);

  // ForEach on the childNodes Array
  todos.forEach(function (todo) {
    // compare the button clicked with cases.
    switch (filterButtonClicked) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        console.log(filterButtonClicked);
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "not-completed":
        console.log(filterButtonClicked);
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      default:
        break;
    }
  });
}

//Save locally:
function saveLocalTodos(todo) {
  //Check if we already have something:
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  localStorage.getItem("todos");

  todos.push(todo);

  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(function (todo) {
    const taskContainer = document.createElement("div");

    const taskElement = document.createElement("p");
    taskElement.innerText = todo;
    taskElement.classList.add("taskElement");

    const completeBtn = document.createElement("button");
    completeBtn.innerText = "Completed";
    completeBtn.classList.add("completeButton");
    completeBtn.classList.add("btn");
    completeBtn.classList.add("btn-warning");

    const removeBtn = document.createElement("button");
    removeBtn.innerText = "Remove Task";
    removeBtn.classList.add("removeButton");
    removeBtn.classList.add("btn");
    removeBtn.classList.add("btn-danger");

    taskContainer.appendChild(taskElement);
    taskContainer.appendChild(completeBtn);
    taskContainer.appendChild(removeBtn);

    taskContainer.classList.add("todo-container");

    todoListCont.appendChild(taskContainer);
  });
}

function removeLocalTodos(todo) {
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);

  localStorage.setItem("todos", JSON.stringify(todos));
}
