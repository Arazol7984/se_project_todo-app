class Todo {
  constructor(data, selector) {
    this._data = data;
    this._selector = selector;
  }

  // Private method to get the template and clone it
  _getTemplate() {
    const todoTemplate = document.querySelector(this._selector);
    this._todoElement = todoTemplate.content
      .querySelector(".todo")
      .cloneNode(true);

    // Cache the elements here to avoid duplicate DOM lookups
    this._todoNameEl = this._todoElement.querySelector(".todo__name");
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoDate = this._todoElement.querySelector(".todo__date");
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");

    return this._todoElement;
  }

  // Private method to set event listeners
  _setEventListeners() {
    this._todoDeleteBtn.addEventListener("click", () => {
      this._handleDelete();
    });

    this._todoCheckboxEl.addEventListener("change", () => {
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

    // Apply id and for attributes.
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
