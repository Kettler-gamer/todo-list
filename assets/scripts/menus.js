function setMainMenu() {
  container.style = "opacity: 1;";
  container.innerHTML = `
    <img class="container-background" src="assets/background-stars.webp" alt="">
      <div class="page-menu">
      
          <h2 class="menu-title">Todo List</h2>
          <div class="menu-buttons">
              <button class="button">Skapa Todo</button>
              <button class="button">Se Todos</button>
              <button class="button">Leta Todos</button>
          </div>
      </div>
      `;
  const buttons = container.querySelectorAll("button");
  buttons[0].addEventListener("click", () => {
    container.style = "opacity: 0;";
    setTimeout(setCreateTodoMenu, 150);
  });
  buttons[2].addEventListener("click", () => {
    container.style = "opacity: 0;";
    setTimeout(setSearchTodosMenu, 150);
  });
}

function setCreateTodoMenu() {
  container.style = "opacity: 1;";
  const pageMenu = container.querySelector(".page-menu");
  pageMenu.innerHTML = `
    <h2 class="menu-title">Skapa todo</h2>
    <input placeholder="Title" class="title-input"/>
    <textarea placeholder="Content" class="content-input"></textarea>
    <input placeholder="End date" class="end-date-input"/>
    <button class="button">Skapa todo</button>
    <button class="button">HuvudMeny</button>
    `;
  const buttons = pageMenu.querySelectorAll("button");
  buttons[0].addEventListener("click", (event) => {
    const todoItem = new TodoItem(
      pageMenu.children[1].value,
      pageMenu.children[2].value,
      pageMenu.children[3].value
    );
    todoList.addTodoItem(todoItem);
  });
  buttons[1].addEventListener("click", (event) => {
    container.style = "opacity: 0;";
    setTimeout(setMainMenu, 150);
  });
}

function setSearchTodosMenu() {
  container.style = "opacity: 1;";
  const pageMenu = document.querySelector(".page-menu");
  pageMenu.innerHTML = `
  <input class="search-box" placeholder="sök här..."/>
  <button class="button">Sök</button>
  <div class="search-result"></div>
  `;
  pageMenu.querySelector("button").addEventListener("click", (event) => {
    const pageMenu = event.currentTarget.parentElement;
    const searchQuery = pageMenu
      .querySelector(".search-box")
      .value.toLowerCase();
    const searchResult = pageMenu.querySelector(".search-result");
    const result = todoList.todos.filter(
      (element) =>
        element.title.toLowerCase().includes(searchQuery) ||
        element.content.toLowerCase().includes(searchQuery)
    );
    if (result.length > 0) {
      fillSearchResult(searchResult, result);
    } else {
      searchResult.innerHTML = `<p>Inga träffar!</p>`;
    }
  });
}

function fillSearchResult(container, result) {
  for (let item of result) {
    const div = document.createElement("div");
    div.innerHTML = `
    <h2>${item.title}</h2>
    <p>${item.content}</p>
    <p>Start date:${item.startDate}</p>
    <p>End date:${item.endDate}</p>
    `;
    container.append(div);
  }
}
