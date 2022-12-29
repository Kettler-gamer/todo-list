loadConfettiPreset(tsParticles);

tsParticles.load("tsparticles", {
  preset: "confetti",
});

let currentLanguage = "english";

function setMainMenu() {
  container.style = "opacity: 1;";
  if(currentLanguage == "swedish") {
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
              <button class="button" onclick="seeTodos()">See todos</button>
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
    
    container.append(languageDiv)
    setLanguage(languageDiv)
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
  pageMenu.innerHTML = `
  <h2 class="menu-title">Färdiga todos</h2>
  <button class="button main-menu-btn">Huvudmeny</button>
  `;
  pageMenu.querySelector("button").addEventListener("click", () => {
    container.style = "opacity: 0;";
    setTimeout(setMainMenu, 150);
  });
  const filteredTodos = todoList.getTodosByCompleted();
  console.log(filteredTodos);
  if (filteredTodos.length > 0) {
    const container = document.createElement("div");
    container.className = "see-todo-container";
    for (let todo of filteredTodos) {
      createCompletedTodoCard(container, todo);
    }
    pageMenu.append(container);
  } else {
  }
}

function createCompletedTodoCard(parent, todo) {
  const todoCard = document.createElement("div");
  todoCard.className = "see-todo-items";
  todoCard.innerHTML = `<span>
        ${todo.title}
        <button class="button delete">Radera</button>
      </span>
       <p class="todo-content">${todo.content}</p>
       <p>${todo.startDate}</p>
       <p>${todo.endDate}</p>
       `;
  todoCard.querySelector(".delete").addEventListener("click", (event) => {
    onDeleteClick(todo);
  });
  parent.append(todoCard);
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
    container.remove()
    setMainMenu()
  })

  flags[1].addEventListener("click", () => {
    currentLanguage = "english";
    container.remove()
    setMainMenu()
  })
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
  if(currentLanguage == "swedish") {
    pageMenu.innerHTML = `<button class="button">Huvudmeny</button>`;
  } else if (currentLanguage == "english") {
    pageMenu.innerHTML = `<button class="button">Main Menu</button>`;
  }
  
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
      const listItemContainer = document.createElement("div");
      listItemContainer.className = "see-todo-items";
      if(currentLanguage == "swedish") {
        listItemContainer.innerHTML = `<label for="${i}">
        ${filteredTodos[i].title}
        <input class="checkbox" id="${i}" type="checkbox"/>
      </label>
       <p class="todo-content">${filteredTodos[i].content}</p>
       <p>Start datum: ${filteredTodos[i].startDate}</p>
       <p>Slut datum: ${filteredTodos[i].endDate}</p>
       `;
      } else if (currentLanguage == "english") {
        listItemContainer.innerHTML = `<label for="${i}">
        ${filteredTodos[i].title}
        <input class="checkbox" id="${i}" type="checkbox"/>
      </label>
       <p class="todo-content">${filteredTodos[i].content}</p>
       <p>Start date: ${filteredTodos[i].startDate}</p>
       <p>End date: ${filteredTodos[i].endDate}</p>
       `;
      }
      
      listItemContainer
        .querySelector(".checkbox")
        .addEventListener("click", (event) => {
          onCheckClick(event, filteredTodos[i]);
        });
      listContainer.append(listItemContainer);
    }
    pageMenu.append(listContainer);
  } else {
    const text = document.createElement("p");
    text.textContent = "Finns inga todos!";
    text.className = "no-todos-text";
    pageMenu.append(text);
  }
}

function createConfirmMenu() {
  const div = document.createElement("div");
  div.className = "confirm-menu";
  div.innerHTML = `
  <h3>Är du säker?</h3>
  <div class="buttons">
    <button class="button">Ja</button>
    <button class="button">Nej</button>
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
  if(currentLanguage == "swedish") {
    pageMenu.innerHTML = `
    <button class="button main-menu-btn">Huvudmeny</button>
    <input class="search-box" placeholder="sök här..."/>
    <button class="button">Sök</button>
    <div class="search-result"></div>
    `;
  } if(currentLanguage == "english") {
    pageMenu.innerHTML = `
    <button class="button main-menu-btn">Main Menu</button>
    <input class="search-box" placeholder="Search here..."/>
    <button class="button">Search</button>
    <div class="search-result"></div>
    `;
  }
  
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
    if(currentLanguage == "swedish") {
      searchResult.innerHTML = `<p>Inga träffar!</p>`;
    } else if (currentLanguage == "english") {
      searchResult.innerHTML = `<p>No matching todos!</p>`;
    }
    
  }
}

function fillSearchResult(container, result) {
  for (let item of result) {
    const div = document.createElement("div");
    if(currentLanguage == "swedish") {
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
