const addTodo = window.document.querySelector('button#add');
const todoList = window.document.querySelector('ul#tarefas');
const newTodo = window.document.querySelector('input#novaTarefa');

let allTodos = carregar();
atualizarLista();

addTodo.addEventListener('click', function (e) {
    e.preventDefault(); //faz com que a tela nao reinicie 
    add();
})

function add() {
    const todoText = newTodo.value.trim(); //trim tira espaços indesejados

    if (todoText.length > 0) {
        allTodos.push(todoText); //jogando pro array
        atualizarLista();
        salvar();
        newTodo.value = ""; //limpando o campo
    } else {
        alert("A tarefa deve ter ao menos uma palavra!"); //feedback do pq deu errado
    }
}

function atualizarLista() {
    todoList.innerHTML = "";
    allTodos.forEach((todo, todoIndex) => {
        todoItem = createTodoItem(todo, todoIndex);
        todoList.append(todoItem);
    })
}

function createTodoItem(todo, todoIndex) {
    const todoLi = window.document.createElement("li");
    const todoID = "todo-" + todoIndex;

    todoLi.className = "tarefa";
    todoLi.innerHTML = `
        <input type="checkbox" id="${todoID}">
        <label for="${todoID}" class="checkbox-tarefa-custom">
          <!-- nesse label eu coloco a imagem personalizada de checagem -->
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="none">
            <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
          </svg>
        </label>
        <label for="${todoID}" class="texto-tarefa">
            ${todo}
        </label>
        <button class="deletar-Tarefa">
          <svg fill="var(--darker)" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
            <path
              d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
          </svg>
        </button>
    `;

    const deletar = todoLi.querySelector(".deletar-Tarefa");
    deletar.addEventListener('click', () =>{
        deleteTodoItem(todoIndex); 
    })
    return todoLi;
}

function deleteTodoItem(todoIndex){ 
    allTodos = allTodos.filter((_, i)=> i !== todoIndex);
    salvar(); 
    atualizarLista();  
}


function salvar() {
    const todosJson = JSON.stringify(allTodos);
    localStorage.setItem("tarefas", todosJson);
}

function carregar() {
    const tarefas = localStorage.getItem("tarefas") || "[]";
    return JSON.parse(tarefas);
}