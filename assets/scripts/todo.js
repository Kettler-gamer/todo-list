class TodoItem {
  constructor(title, content, startDate, endDate) {
    this.title = title;
    this.content = content;
    this.startDate = startDate;
    this.endDate = endDate || "End date not set";
    this.completed = false;
  }

  setDeadline(endDate) {
    this.endDate = endDate;
  }

  setDeadlineIn(days) {
    const time = this.startDate.getTime() + days * 24 * 60 * 60 * 1000;
    const date = new Date(time);
    this.endDate = date;
  }

  getRemainingDays() {
    const date = new Date(this.endDate);
    return Math.ceil((date - this.startDate) / 1000 / 60 / 60 / 24);
  }

  getHtmlTemplate() {
    return `
    <h3>${this.title}</h3>
    <p>${this.content}</p>
    `;
  }
}

class TodoList {
  constructor() {
    this.todos = [];
  }

  addTodoItem(todoItem) {
    this.todos.push(todoItem);
  }

  removeTodoItem(todoItem) {
    const index = this.todos.indexOf(todoItem);
    if (index != -1) {
      this.todos.splice(index, 1);
    }
  }

  printTitles() {
    console.log(`There are ${this.todos.length} entries in the todo list`);
    this.todos.forEach((todo) => console.log(todo.title));
  }

  getTodosByTitle(titleQuery) {
    return this.todos.filter((todo) => todo.title.includes(titleQuery));
  }

  getTodosByRemainingTime(days) {
    return this.todos.filter((todo) => todo.getRemainingDays() <= days);
  }

  getHtmlList() {
    return this.todos.map((todo) => todo.getHtmlTemplate()).join("");
  }
}
