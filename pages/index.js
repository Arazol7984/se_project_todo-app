import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid"; // FIX: Import uuidv4 here

// Selectors
const addTodoButton = document.querySelector(".button_action_add");
// FIX: Renamed todosList to todosContainer for clarity
const todosContainer = document.querySelector(".todos__list");
const addTodoForm = document.querySelector("#add-todo-form");

// Instantiate new classes
const addTodoFormValidator = new FormValidator(validationConfig, addTodoForm);
addTodoFormValidator.enableValidation();

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const todoSection = new Section({
  items: initialTodos,
  renderer: (item) => {
    // FIX: Pass the new callbacks to the Todo constructor
    const todo = new Todo(item, "#todo-template", {
      onDelete: () => {
        todoCounter.updateTotal(false);
        // Assuming the Todo class itself handles the DOM element removal
      },
      onToggleCompleted: (isCompleted) => {
        todoCounter.updateCompleted(isCompleted);
      },
    });
    return todo.getView();
  },
  // FIX: Changed selector to todosContainer for consistency
  containerSelector: ".todos__list",
});

const addTodoPopup = new PopupWithForm("#add-todo-popup", (data) => {
  const todoData = {
    name: data.name,
    date: data.date,
    id: uuidv4(), // FIX: This is now correctly imported
    completed: false,
  };
  // FIX: Pass the new callbacks for the newly created todo
  const newTodo = new Todo(todoData, "#todo-template", {
    onDelete: () => {
      todoCounter.updateTotal(false);
    },
    onToggleCompleted: (isCompleted) => {
      todoCounter.updateCompleted(isCompleted);
    },
  });
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
