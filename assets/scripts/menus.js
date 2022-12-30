loadConfettiPreset(tsParticles);

tsParticles.load("tsparticles", {
  preset: "confetti",
});

let currentLanguage = "english";

function setMainMenu() {
  container.style = "opacity: 1;";
  if (currentLanguage == "swedish") {
    container.innerHTML = `
    <img class="container-background" src="assets/background-stars.webp" alt="">
    <img class="rotating-stars" src="assets/test.webp" />
    
      <div class="page-menu">
      <img class="language-flag" src="assets/swedish.flag.png" />
          <h2 class="menu-title">Att göra lista</h2>
          <div class="menu-buttons">
              <button class="button">Skapa Todo</button>
              <button class="button">Se Todos</button>
              <button class="button">Leta Todos</button>
              <button class="button">Färdiga Todos</button>
          </div>
      </div>
      `;
  } else if (currentLanguage == "english") {
    container.innerHTML = `
    <img class="container-background" src="assets/background-stars.webp" alt="">
    <img class="rotating-stars" src="assets/test.webp" />
    
      <div class="page-menu">
        <img class="language-flag" src="assets/english.flag.png" />
          <h2 class="menu-title">Todo list</h2>
          <div class="menu-buttons">
              <button class="button">Create Todo</button>
              <button class="button">See todos</button>
              <button class="button">Search todos</button>
              <button class="button">Finished todos</button>
          </div>
      </div>
      `;
  }

  const buttons = container.querySelectorAll("button");
  setMainMenuClicks(buttons, [
    setCreateTodoMenu,
    seeTodos,
    setSearchTodosMenu,
    setCompletedTodosMenu,
  ]);
  const languageFlag = document.querySelector(".language-flag");

  languageFlag.addEventListener("click", () => {
    const languageDiv = document.createElement("div");
    languageDiv.className = "lang-select-container";
    if (currentLanguage == "english") {
      languageDiv.innerHTML = `
      <h2 class="lang-select-title">Select your language</h2>
        <div class="lang-select-flags">
            <img class="flag-img" src="assets/swedish.flag.png" />
            <img class="flag-img" src="assets/english.flag.png" />
        </div>
      `;
    } else if (currentLanguage == "swedish") {
      languageDiv.innerHTML = `
      <h2 class="lang-select-title">Välj ditt språk</h2>
        <div class="lang-select-flags">
            <img class="flag-img" src="assets/swedish.flag.png" />
            <img class="flag-img" src="assets/english.flag.png" />
        </div>
      `;
    }

    container.append(languageDiv);
    setLanguage(languageDiv);
  });
}

function setMainMenuClicks(buttons, clicks) {
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", () => {
      container.style = "opacity: 0;";
      setTimeout(clicks[i], 150);
    });
  }
}

function setCompletedTodosMenu() {
  container.style = "opacity: 1;";
  const pageMenu = document.querySelector(".page-menu");
  const words = [
    "Färdiga att göra",
    "Huvudmeny",
    "Completed todos",
    "Main Menu",
  ];
  const index = currentLanguage == "swedish" ? 0 : 2;
  pageMenu.innerHTML = `
    <h2 class="menu-title">${words[index]}</h2>
    <button class="button main-menu-btn">${words[index + 1]}</button>
    `;

  pageMenu.querySelector("button").addEventListener("click", () => {
    container.style = "opacity: 0;";
    setTimeout(setMainMenu, 150);
  });
  const filteredTodos = todoList.getTodosByCompleted();
  if (filteredTodos.length > 0) {
    const container = document.createElement("div");
    container.className = "see-todo-container";
    for (let todo of filteredTodos) {
      todo.createCompletedTodoCard(container);
    }
    pageMenu.append(container);
  } else {
    createNoTodosText(pageMenu);
  }
}

function createNoTodosText(parent) {
  const text = document.createElement("p");
  text.textContent =
    currentLanguage == "swedish" ? "Finns inga todos!" : "No todos availible!";
  text.className = "no-todos-text";
  parent.append(text);
}

function onDeleteClick(todo) {
  const pageMenu = document.querySelector(".page-menu");
  const div = createConfirmMenu();
  const buttons = div.querySelectorAll("button");
  buttons[0].addEventListener("click", () => {
    todoList.removeTodoItem(todo);
    div.remove();
    setCompletedTodosMenu();
  });
  buttons[1].addEventListener("click", () => {
    div.remove();
  });
  pageMenu.append(div);
}

function setLanguage(container) {
  const flags = container.querySelectorAll(".flag-img");

  flags[0].addEventListener("click", () => {
    currentLanguage = "swedish";
    container.remove();
    setMainMenu();
  });

  flags[1].addEventListener("click", () => {
    currentLanguage = "english";
    container.remove();
    setMainMenu();
  });
}

function setCreateTodoMenu() {
  container.style = "opacity: 1;";
  const pageMenu = container.querySelector(".page-menu");

  if (currentLanguage == "swedish") {
    pageMenu.innerHTML = `
    <h2 class="menu-title">Skapa att göra</h2>
    <input placeholder="Titel" class="title-input"/>
    <textarea placeholder="Beskrivning" class="content-input"></textarea>
    <input placeholder="Start datum" class="start-date-input"/>
    <input placeholder="Slut datum" class="end-date-input"/>
    <div class="create-buttons-container">
    <button class="button">Skapa att göra</button>
    <div id="tsparticles"></div>
    <button class="button">Huvudmeny</button>
    </div>
    `;
  } else if (currentLanguage == "english") {
    pageMenu.innerHTML = `
    <h2 class="menu-title">Create todo</h2>
    <input placeholder="Title" class="title-input"/>
    <textarea placeholder="Description" class="content-input"></textarea>
    <input placeholder="Start date" class="start-date-input"/>
    <input placeholder="End date" class="end-date-input"/>
    <div class="create-buttons-container">
    <button class="button">Create todo</button>
    <div id="tsparticles"></div>
    <button class="button">Main Menu</button>
    </div>
    `;
  }

  const buttons = pageMenu.querySelectorAll("button");
  buttons[0].addEventListener("click", (event) => {
    const todoItem = new TodoItem(
      pageMenu.children[1].value,
      pageMenu.children[2].value,
      pageMenu.children[3].value,
      pageMenu.children[4].value
    );
    for (let i = 1; i < 5; i++) {
      pageMenu.children[i].value = "";
    }
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
      disableForReducedMotion: true,
    });
  });
  buttons[1].addEventListener("click", (event) => {
    container.style = "opacity: 0;";
    setTimeout(setMainMenu, 150);
  });
}

function seeTodos() {
  container.style = "opacity: 1;";
  const pageMenu = container.querySelector(".page-menu");
  const word = currentLanguage == "swedish" ? "Huvudmeny" : "Main Menu";
  pageMenu.innerHTML = `<button class="button">${word}</button>`;
  const button = pageMenu.querySelector(".button");
  button.addEventListener("click", (event) => {
    container.style = "opacity: 0;";
    setTimeout(setMainMenu, 150);
  });
  const listContainer = document.createElement("div");
  listContainer.className = "see-todo-container";
  const filteredTodos = todoList.getTodosByNotCompleted();
  if (filteredTodos.length > 0) {
    for (let i = 0; i < filteredTodos.length; i++) {
      filteredTodos[i].createTodoCard(listContainer);
    }
    pageMenu.append(listContainer);
  } else {
    createNoTodosText(pageMenu);
  }
}

function createConfirmMenu() {
  const div = document.createElement("div");
  div.className = "confirm-menu";
  const words = ["Är du säker", "Ja", "Nej", "Are you sure", "Yes", "No"];
  const index = currentLanguage == "swedish" ? 0 : 3;
  div.innerHTML = `
  <h3>${words[index]}?</h3>
  <div class="buttons">
    <button class="button">${words[index + 1]}</button>
    <button class="button">${words[index + 2]}</button>
  </div>
  `;
  return div;
}

function onCheckClick(event, todoItem) {
  const pageMenu = document.querySelector(".page-menu");
  const checkbox = event.currentTarget;
  const div = createConfirmMenu();
  const buttons = div.querySelectorAll(".button");
  buttons[0].addEventListener("click", () => {
    div.remove();
    onConfirmClick(todoItem);
  });
  buttons[1].addEventListener("click", () => {
    div.remove();
    checkbox.checked = false;
  });
  pageMenu.before(div);
}

function onConfirmClick(todoItem) {
  todoItem.completed = true;
  seeTodos();
}

function setSearchTodosMenu() {
  container.style = "opacity: 1;";
  const pageMenu = document.querySelector(".page-menu");
  const words = [
    "Huvudmeny",
    "Sök här...",
    "Sök",
    "Main Menu",
    "Search here...",
    "Search",
  ];
  const index = currentLanguage == "swedish" ? 0 : 3;
  pageMenu.innerHTML = `
    <button class="button main-menu-btn">${words[index]}</button>
    <input class="search-box" placeholder="${words[index + 1]}"/>
    <button class="button">${words[index + 2]}</button>
    <div class="see-todo-container"></div>
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
  const searchResult = pageMenu.querySelector(".see-todo-container");
  const result = todoList.todos.filter(
    (element) =>
      element.title.toLowerCase().includes(searchQuery) ||
      element.content.toLowerCase().includes(searchQuery)
  );
  searchResult.innerHTML = "";
  if (result.length > 0) {
    fillSearchResult(searchResult, result);
  } else {
    createNoTodosText(searchResult);
  }
}

function fillSearchResult(container, result) {
  for (let item of result) {
    const div = document.createElement("div");
    div.className = "see-todo-items";
    if (currentLanguage == "swedish") {
      div.innerHTML = `
      <h2>${item.title}</h2>
      <p>${item.content}</p>
      <p>Start datum:${item.startDate}</p>
      <p>Slut datum:${item.endDate}</p>
      `;
      container.append(div);
    } else if (currentLanguage == "english") {
      div.innerHTML = `
      <h2>${item.title}</h2>
      <p>${item.content}</p>
      <p>Start date:${item.startDate}</p>
      <p>End date:${item.endDate}</p>
      `;
      container.append(div);
    }
  }
}
