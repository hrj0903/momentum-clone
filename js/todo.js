const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-form input');
const todoList = document.querySelector('#todo-list');

const TODOS_KEY = 'todos';

let toDos = [];

function saveToDos() {
	localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(e) {
	const li = e.target.parentElement;
	li.remove();
	toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
	saveToDos();
}

function paintToDo(newTodo) {
	const li = document.createElement('li');
	li.id = newTodo.id;
	const span = document.createElement('span');
	span.innerText = newTodo.text;
	const button = document.createElement('button');
	button.innerText = '❌';
	button.addEventListener('click', deleteToDo);
	li.appendChild(span);
	li.appendChild(button);
	todoList.appendChild(li);
}

function handleToDoSubmit(e) {
	e.preventDefault();
	const newTodo = todoInput.value;
	todoInput.value = '';
	const newTodoObj = {
		text: newTodo,
		id: Date.now(),
	};
	if (toDos.length < 5) {
		toDos.push(newTodoObj);
		paintToDo(newTodoObj);
		saveToDos();
	} else {
		alert('투두 리스트의 최대 갯수는 5개 입니다.');
	}
}

todoForm.addEventListener('submit', handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
	const parsedTodos = JSON.parse(savedToDos);
	toDos = parsedTodos;
	parsedTodos.forEach(paintToDo);
}
