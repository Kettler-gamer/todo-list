function setMainMenu() {
  container.innerHTML = `
    <img class="container-background" src="assets/background-stars.jpg" alt="">
      <div class="page-menu">
      
          <h2 class="menu-title">Todo List</h2>
          <div class="menu-buttons">
              <button onclick="setCreateTodoMenu()">Skapa Todo</button>
              <button onclick="seeTodos()">Se Todos</button>
              <button>Leta Todos</button>
          </div>
      </div>
      `;
}

function setCreateTodoMenu() {
  const pageMenu = container.querySelector(".page-menu");
  pageMenu.innerHTML = `
    <h2>Skapa todo</h2>
    <input class="title-input"/>
    <input class="content-input"/>
    <input class="end-date-input"/>
    <button onClick="onCreateTodoClick(event)">Skapa todo</button>
    <button onclick="setMainMenu()">HuvudMeny</button>
    `;
    console.log("setting click event");
}

function onCreateTodoClick(event) {
  const inputs = event.currentTarget.parentElement.querySelectorAll("input");
    const todoItem = new TodoItem(
      inputs[0].value,
      inputs[1].value,
      inputs[2].value
    );
    todoList.addTodoItem(todoItem);
    console.table(todoList)
}



function seeTodos() {
  const pageMenu = container.querySelector(".page-menu");
  pageMenu.innerHTML = "";
  const listContainer = document.createElement("div");
  listContainer.className = "see-todo-container"
  console.table(todoList)
  for (let i = 0; i < todoList.todos.length; i++) {
    const listItemContainer = document.createElement("div");
    listItemContainer.className = "see-todo-items"
    listItemContainer.innerHTML = 
    `<label for="${i}">${todoList.todos[i].title}<input class="checkbox" id="${i}" type="checkbox"/></label>
     <p class="todo-content">${todoList.todos[i].content}</p>
     <p>${todoList.todos[i].startDate}</p>
     <p>${todoList.todos[i].endDate}</p>
     `;

     listContainer.append(listItemContainer);
  }
  pageMenu.append(listContainer);
}
