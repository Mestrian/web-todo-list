const addTodo = window.document.querySelector('button#add');
const todoList = window.document.querySelector('ul#tarefas'); 
const newTodo = window.document.querySelector('input#novaTarefa');

let allTodos = []; 

addTodo.addEventListener('click', function(e){
    e.preventDefault(); 
    add(); 
})


function add() {
    const todoText = newTodo.value.trim(); //trim tira espaços indesejados
    
    if(todoText.length > 0){
        allTodos.push(todoText); //jogando pro array
        createTodoItem(todoText); 
        newTodo.value = ""; //limpando o campo
    } else {
        alert("A tarefa deve ter ao menos uma palavra!"); 
    }
}

function createTodoItem(todo) {
    const todoLi = window.document.createElement("li"); 
    todoLi.innerText = todo; 
    todoList.append(todoLi); //colocando LI na lista que eu defini no inicio
}
