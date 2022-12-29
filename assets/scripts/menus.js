loadConfettiPreset(tsParticles);

tsParticles.load("tsparticles", {
  preset: "confetti",
});
function setMainMenu() {
  container.style = "opacity: 1;";
  container.innerHTML = `
    <img class="container-background" src="assets/background-stars.webp" alt="">
      <div class="page-menu">
      
          <h2 class="menu-title">Todo List</h2>
          <div class="menu-buttons">
              <button class="button">Skapa Todo</button>
              <button class="button" onclick="seeTodos()">Se Todos</button>
              <button class="button">Leta Todos</button>
              <button class="button">Färdiga Todos</button>
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
    <input placeholder="Start date" class="start-date-input"/>
    <input placeholder="End date" class="end-date-input"/>
    <div class="create-buttons-container">
    <button class="button">Skapa todo</button>
    <div id="tsparticles"></div>
    <button class="button">HuvudMeny</button>
    </div>
    `;
  
  const buttons = pageMenu.querySelectorAll("button");
  buttons[0].addEventListener("click", (event) => {
    const todoItem = new TodoItem(
      pageMenu.children[1].value,
      pageMenu.children[2].value,
      pageMenu.children[3].value,
      pageMenu.children[4].value
    );
    todoList.addTodoItem(todoItem);
    confetti("tsparticles", {
      angle: 90,
      count: 25,
      position: { x: 50, y: 50 },
      spread: 90,
      startVelocity: 60,
      decay: 0.9,
      gravity: 1,
      drift: 0,
      ticks: 200,
      colors: ["#fff", "#f00"],
      shapes: ["square", "circle"],
      scalar: 1,
      zIndex: 2000,
      disableForReducedMotion: true
    });
  });
  buttons[1].addEventListener("click", (event) => {
    container.style = "opacity: 0;";
    setTimeout(setMainMenu, 150);
  });
}

function seeTodos() {
  const pageMenu = container.querySelector(".page-menu");
  pageMenu.innerHTML = `<button class="button">Huvudmeny</button>`;
  const button = pageMenu.querySelector(".button");
  button.addEventListener("click", (event) => {
    container.style = "opacity: 0;";
    setTimeout(setMainMenu, 150);
  });
  const listContainer = document.createElement("div");
  listContainer.className = "see-todo-container";
  console.table(todoList);
  for (let i = 0; i < todoList.todos.length; i++) {
    const listItemContainer = document.createElement("div");
    listItemContainer.className = "see-todo-items";
    listItemContainer.innerHTML = `<label for="${i}">${todoList.todos[i].title}<input class="checkbox" id="${i}" type="checkbox"/></label>
     <p class="todo-content">${todoList.todos[i].content}</p>
     <p>${todoList.todos[i].startDate}</p>
     <p>${todoList.todos[i].endDate}</p>
     `;

    listContainer.append(listItemContainer);
  }
  pageMenu.append(listContainer);
}

function setSearchTodosMenu() {
  container.style = "opacity: 1;";
  const pageMenu = document.querySelector(".page-menu");
  pageMenu.innerHTML = `
  <button class="button main-menu-btn">Huvudmeny</button>
  <input class="search-box" placeholder="sök här..."/>
  <button class="button">Sök</button>
  <div class="search-result"></div>
  `;
  const buttons = pageMenu.querySelectorAll("button");
  buttons[1].addEventListener("click", onSearchClick);
  buttons[0].addEventListener("click", (event) => {
    container.style = "opacity: 0;";
    setTimeout(setMainMenu, 150);
  });
}

function onSearchClick(event) {
  const pageMenu = event.currentTarget.parentElement;
  const searchQuery = pageMenu.querySelector(".search-box").value.toLowerCase();
  const searchResult = pageMenu.querySelector(".search-result");
  const result = todoList.todos.filter(
    (element) =>
      element.title.toLowerCase().includes(searchQuery) ||
      element.content.toLowerCase().includes(searchQuery)
  );
  if (result.length > 0) {
    searchResult.innerHTML = "";
    fillSearchResult(searchResult, result);
  } else {
    searchResult.innerHTML = `<p>Inga träffar!</p>`;
  }
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
