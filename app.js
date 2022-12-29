const container = document.querySelector(".container");

const todoList = new TodoList();

(() => {
  setMainMenu();
})();

let testTodo = new TodoItem("Test", "Do the dishes before they mold Do the dishes before they mold", "2024-02-28", "2029-09-03");

todoList.addTodoItem(testTodo);

testTodo = new TodoItem("Test", "Do the dishes before they mold", "2024", "2029");

todoList.addTodoItem(testTodo);
testTodo = new TodoItem("Test", "Do the dishes before they mold", "2024", "2029");

todoList.addTodoItem(testTodo);
testTodo = new TodoItem("Test", "Do the dishes before they mold", "2024", "2029");

todoList.addTodoItem(testTodo);

console.table(todoList);