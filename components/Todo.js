// Todo.js
import { v4 as uuidv4 } from "https://jspm.dev/uuid";

class Todo {
  constructor(data, selector, { onDelete, onToggleCompleted }) {
    this._data = data;
    this._selector = selector;
    this._onDelete = onDelete;
    this._onToggleCompleted = onToggleCompleted;
  }

  _getTemplate() {
    const todoTemplate = document.querySelector(this._selector);
    this._todoElement = todoTemplate.content
      .querySelector(".todo")
      .cloneNode(true);

    this._todoNameEl = this._todoElement.querySelector(".todo__name");
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoDate = this._todoElement.querySelector(".todo__date");
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");

    return this._todoElement;
  }

  _setEventListeners() {
    this._todoDeleteBtn.addEventListener("click", () => {
      // Pass the completed status to the onDelete callback
      this._onDelete(this._todoCheckboxEl.checked);
      this._handleDelete();
    });

    this._todoCheckboxEl.addEventListener("change", () => {
      this._onToggleCompleted(this._todoCheckboxEl.checked);
      this._handleToggleCompleted();
    });
  }

  _handleDelete() {
    this._todoElement.remove();
  }

  _handleToggleCompleted() {
    this._todoElement.classList.toggle(
      "todo_completed",
      this._todoCheckboxEl.checked
    );
  }

  getView() {
    this._getTemplate();
    this._todoNameEl.textContent = this._data.name;
    this._todoCheckboxEl.checked = this._data.completed;

    const uniqueId = this._data.id || uuidv4();
    this._todoCheckboxEl.id = `todo-${uniqueId}`;
    this._todoLabel.setAttribute("for", `todo-${uniqueId}`);

    const dueDate = new Date(this._data.date);
    if (!isNaN(dueDate)) {
      this._todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }

    this._setEventListeners();

    return this._todoElement;
  }
}

export default Todo;
