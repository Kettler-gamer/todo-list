class TodoItem {
  constructor() {
    this.title = "Placeholder title...";
    this.content = "Placeholder content...";
    this.startDate = new Date();
    this.endDate = "End date not set";
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

let todoList = new TodoList();

let todo = new TodoItem();
todo.title = "Laundry";
todo.content = "On monday at 15:00 I have to do laundry before parents arrive";
todo.setDeadline("2022-12-30");

let todo2 = new TodoItem();
todo2.title = "Trash";
todo2.content = "Take out the trash!";
todo2.setDeadlineIn(1);

let todo3 = new TodoItem();
todo3.title = "Homework";
todo3.content = "Study!";
todo3.setDeadlineIn(2);

todoList.addTodoItem(todo);
todoList.addTodoItem(todo2);
todoList.addTodoItem(todo3);
