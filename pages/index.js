import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

// Selectors
const addTodoButton = document.querySelector(".button_action_add");
const todosList = document.querySelector(".todos__list");
const addTodoForm = document.querySelector("#add-todo-form");

// Instantiate new classes
const addTodoFormValidator = new FormValidator(validationConfig, addTodoForm);
addTodoFormValidator.enableValidation();

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const todoSection = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todo = new Todo(item, "#todo-template");
    return todo.getView();
  },
  containerSelector: ".todos__list",
});

const addTodoPopup = new PopupWithForm("#add-todo-popup", (data) => {
  const todoData = {
    name: data.name,
    date: data.date,
    id: uuidv4(),
    completed: false,
  };
  const newTodo = new Todo(todoData, "#todo-template");
  todoSection.addItem(newTodo.getView());
  todoCounter.updateTotal(true);
  addTodoPopup.close();
});

// Event Listeners
addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
  addTodoFormValidator.resetValidation();
});

addTodoPopup.setEventListeners();

// Initial rendering of todos
todoSection.renderItems();
