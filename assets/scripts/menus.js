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
  const listContainer = document.createElement("div");
  console.table(todoList)
  for (let i = 0; i < todoList.todos.length; i++) {
    const listItemContainer = document.createElement("div");
    listItemContainer.innerHTML = 
    `<h1>${todoList.todos[i].title}<h1>
     <p>${todoList.todos[i].content}</p>
     <p>${todoList.todos[i].startDate}</p>
     <p>${todoList.todos[i].endDate}</p>`;

     listContainer.append(listItemContainer);
  }
  pageMenu.innerHTML = listContainer.innerHTML ;
}
