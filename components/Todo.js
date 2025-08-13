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
    return this._todoElement;
  }

  // Private method to set event listeners
  _setEventListeners() {
    const todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");
    const todoCheckboxEl = this._todoElement.querySelector(".todo__completed");

    todoDeleteBtn.addEventListener("click", () => {
      this._handleDelete();
    });

    todoCheckboxEl.addEventListener("change", () => {
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
      this._todoElement.querySelector(".todo__completed").checked
    );
  }

  // Public method to return the finished to-do element
  getView() {
    this._getTemplate();

    const todoNameEl = this._todoElement.querySelector(".todo__name");
    const todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    const todoLabel = this._todoElement.querySelector(".todo__label");
    const todoDate = this._todoElement.querySelector(".todo__date");

    todoNameEl.textContent = this._data.name;
    todoCheckboxEl.checked = this._data.completed;

    // Apply id and for attributes. The id will be a new UUID for new todos.
    const uniqueId = this._data.id || uuidv4();
    todoCheckboxEl.id = `todo-${uniqueId}`;
    todoLabel.setAttribute("for", `todo-${uniqueId}`);

    const dueDate = new Date(this._data.date);
    if (!isNaN(dueDate)) {
      todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
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
