import { v4 as uuidv4 } from "https://jspm.dev/uuid";

class Todo {
  // Add new parameters for the callback functions
  constructor(data, selector, { onDelete, onToggleCompleted }) {
    this._data = data;
    this._selector = selector;
    this._onDelete = onDelete;
    this._onToggleCompleted = onToggleCompleted;
  }

  // Private method to get the template and clone it
  _getTemplate() {
    // ... (no changes needed here)
  }

  // Private method to set event listeners
  _setEventListeners() {
    this._todoDeleteBtn.addEventListener("click", () => {
      // Call the external onDelete callback
      this._onDelete(this._data.id);
      this._handleDelete();
    });

    this._todoCheckboxEl.addEventListener("change", () => {
      // Call the external onToggleCompleted callback
      this._onToggleCompleted(this._data.id, this._todoCheckboxEl.checked);
      this._handleToggleCompleted();
    });
  }

  // Private method to handle deletion
  _handleDelete() {
    this._todoElement.remove();
  }

  // Private method to handle toggling the completed status
  _handleToggleCompleted() {
    this._todoElement.classList.toggle(
      "todo_completed",
      this._todoCheckboxEl.checked
    );
  }

  // Public method to return the finished to-do element
  getView() {
    this._getTemplate();
    this._todoNameEl.textContent = this._data.name;
    this._todoCheckboxEl.checked = this._data.completed;

    // Fix the uuidv4() issue
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
