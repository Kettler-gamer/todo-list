function setMainMenu() {
  container.innerHTML = `
    <img class="container-background" src="assets/background-stars.jpg" alt="">
      <div class="page-menu">
      
          <h2 class="menu-title">Todo List</h2>
          <div class="menu-buttons">
              <button onclick="setCreateTodoMenu()">Skapa Todo</button>
              <button>Se Todos</button>
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
    <button>Skapa todo</button>
    <button onclick="setMainMenu()">HuvudMeny</button>
    `;
  pageMenu.querySelectorAll("button")[0].addEventListener("click", (event) => {
    const inputs = event.currentTarget.parentElement.querySelectorAll("input");
    const todoItem = new TodoItem(
      inputs[0].value,
      inputs[1].value,
      inputs[2].value
    );
    todoList.addTodoItem(todoItem);
  });
}
