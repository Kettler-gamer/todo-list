const container = document.querySelector(".container");

const todoList = new TodoList();

const todoItem = new TodoItem("Städa", "Damsug huset", "2022-12-31");
const todoItem2 = new TodoItem("Äta", "Ät upp riset", "2029");
const todoItem3 = new TodoItem("test", "test", "2029");

todoList.addTodoItem(todoItem);
todoList.addTodoItem(todoItem2);
todoList.addTodoItem(todoItem3);

console.table(todoList);

(() => {
  setMainMenu();
})();
