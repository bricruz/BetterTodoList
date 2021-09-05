
const form = document.querySelector('#addTodo');
const input = document.querySelector('#todo');
const todoList = document.querySelector('#todoList')


let savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
for (let i = 0; i < savedTodos.length; i++) {
    let li = document.createElement("li");
    let removeButton = document.createElement("BUTTON");
    removeButton.innerText = "Remove";
    li.innerText = savedTodos[i].task + " ";
    li.isCompleted = savedTodos[i].isCompleted ? true : false;
    if (li.isCompleted) {
        li.classList.add('strike');
    }

    li.appendChild(removeButton);
    todoList.appendChild(li);
    console.log(li.innerText);
}

form.addEventListener('submit', function (e) {
    e.preventDefault();
    let newTodo = input.value;
    let li = document.createElement('li');
    let removeButton = document.createElement("BUTTON");
    let space = document.createElement("SPAN");
    space.innerHTML = " ";
    removeButton.innerHTML = "Remove";
    li.append(newTodo);
    li.appendChild(space);
    li.appendChild(removeButton);
    form.reset();
    todoList.prepend(li);
    let todo = li.innerText;
    todo = todo.slice(0, -6);
    console.log(todo);
    savedTodos.push({ task: todo, isCompleted: false });
    localStorage.setItem("todos", JSON.stringify(savedTodos));
    //console.log(form);
});

todoList.addEventListener('click', function (e) {
    //console.log(e.target.tagName);
    let clickedLI = e.target;
    let theTodo = clickedLI.innerText.slice(0, -6);
    console.log(clickedLI);
    if (clickedLI.tagName == "BUTTON") {
        //console.log(clickedLI.parentElement.innerText);

        for (let i = 0; i < savedTodos.length; i++) {
            if (savedTodos[i].task === clickedLI.parentElement.innerText.slice(0, -6)) {
                //console.log(clickedLI.innerText);
                savedTodos.splice(i, 1);
                localStorage.setItem("todos", JSON.stringify(savedTodos));

            }
        }
        clickedLI.parentElement.remove();
    }
    else if (clickedLI.tagName == "LI") {
        //clickedLI.classList.add('strike');
        if (!clickedLI.isCompleted) {
            clickedLI.classList.add('strike');
            clickedLI.isCompleted = true;
        }
        else {
            clickedLI.classList.remove('strike');
            clickedLI.isCompleted = false;
        }
    }
    console.log(theTodo);
    for (let i = 0; i < savedTodos.length; i++) {
        if (savedTodos[i].task === theTodo) {
            savedTodos[i].isCompleted = !savedTodos[i].isCompleted;
            localStorage.setItem("todos", JSON.stringify(savedTodos));
        }
    }
});