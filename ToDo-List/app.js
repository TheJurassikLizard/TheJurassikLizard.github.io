//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
const editButton = document.querySelector(".edit-header");
const titleHeader = document.querySelector(".title-header")

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
document.addEventListener("DOMContentLoaded", getHeader);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);
editButton.addEventListener("click", editHeader);
document.querySelector(".title-header").addEventListener('keydown', (evt) => {
    if (evt.key === "Enter") {
        evt.preventDefault();
        titleHeader.contentEditable = "false";
        saveHeader();
    }
});

//Functions
function addTodo(event){
    //Prevent form from submitting
    event.preventDefault();

    //Create DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //Creatie LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    todoDiv.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //Add TODO to local storage
    saveLocalTodos(todoInput.value);

    //Create CHECK button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //Create TRASH button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //Append to LIST
    todoList.appendChild(todoDiv);

    //Clear todoInput value
    todoInput.value = "";
}

function deleteCheck(e){
    const item = e.target;
    
    //Delete TODO
    if(item.classList[0] === "trash-btn"){
        const todo = item.parentElement;
        //Add Animation
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", function(){
            todo.remove();
        });
    }

    //Check TODO
    if(item.classList[0] === "complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex";
                } 
                else{
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display = "flex";
                } 
                else{
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalTodos(todo){
    let todos;
    
    //Check
    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    //Save Todos
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(){
    let todos;
    
    //Check
    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(function(todo){
        //Create DIV
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        //Creatie LI
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        todoDiv.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        //Create CHECK button
        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        //Create TRASH button
        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        //Append to LIST
        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo){
    let todos;
    
    //Check
    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    const todoIndex = todos.indexOf(todo.children[0].innerText);
    todos.splice(todoIndex, 1);
    window.localStorage.setItem("todos", JSON.stringify(todos));
}

function editHeader(e){
    if(titleHeader.contentEditable == "true"){
        titleHeader.contentEditable = "false";
    }
    else{
        titleHeader.contentEditable = "true";
    }
}

function saveHeader(){
    window.localStorage.setItem("header", titleHeader.textContent);
}

function getHeader(){
    if(localStorage.getItem("header") === null || localStorage.getItem("header") === ""){
        titleHeader.innerText = "Please Edit The Title!";
    }
    else{
        titleHeader.innerText = localStorage.getItem("header");
    }
}