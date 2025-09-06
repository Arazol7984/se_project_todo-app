import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";

const addTodoButton = document.querySelector(".button_action_add");
const todosContainer = document.querySelector(".todos__list");
const addTodoForm = document.querySelector("#add-todo-form");

const addTodoFormValidator = new FormValidator(validationConfig, addTodoForm);
addTodoFormValidator.enableValidation();

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const generateTodo = (todoData) => {
  const todo = new Todo(todoData, "#todo-template", {
    onDelete: () => {
      if (todoData.completed) {
        todoCounter.updateCompleted(false);
      }
      todoCounter.updateTotal(false);
    },
    onToggleCompleted: (isCompleted) => {
      todoCounter.updateCompleted(isCompleted);
    },
  });
  return todo.getView();
};

const todoSection = new Section({
  items: initialTodos,
  renderer: (item) => generateTodo(item),
  containerSelector: ".todos__list",
});

const addTodoPopup = new PopupWithForm("#add-todo-popup", (data) => {
  const todoData = {
    name: data.name,
    date: data.date,
    id: uuidv4(),
    completed: false,
  };
  const newTodoElement = generateTodo(todoData);
  todoSection.addItem(newTodoElement);
  todoCounter.updateTotal(true);
  addTodoPopup.close();
  addTodoFormValidator.resetValidation();
});

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

addTodoPopup.setEventListeners();

todoSection.renderItems();
