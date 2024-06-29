import './style.css';

interface Todo {
  title: string;
  isCompleted: boolean;
  readonly id: string;
}

const todos: Todo[] = [];

const todosContainer = document.querySelector(
  '.todosContainer'
) as HTMLDivElement;

const todoInput = document.getElementsByName('title')[0] as HTMLInputElement;

const myForm = document.getElementById('myForm') as HTMLFormElement;

myForm.onsubmit = (e) => {
  e.preventDefault();
  const todo: Todo = {
    title: todoInput.value,
    isCompleted: false,
    id: String(Math.random() * 1000),
  };

  todos.push(todo);
  todoInput.value = '';
  renderTodo(todos);
};

const generateTodoItem = (title: string, isCompleted: boolean, id: string) => {
  const todo: HTMLDivElement = document.createElement('div');
  todo.className = 'todo-item';
  //Creating a checkbox
  const checkBox: HTMLInputElement = document.createElement('input');
  checkBox.setAttribute('type', 'checkbox');
  checkBox.className = 'isCompleted';
  checkBox.checked = isCompleted;
  checkBox.onchange = () => {
    todos.find((item) => {
      if (item.id === id) item.isCompleted = checkBox.checked;
    });
    label.className = checkBox.checked ? 'textCut' : '';
  };

  // Creating label for title
  const label: HTMLLabelElement = document.createElement('label');
  label.innerText = title;
  label.className = isCompleted ? 'textCut' : '';
  //Creating Delete Button
  const btn: HTMLButtonElement = document.createElement('button');
  btn.innerText = 'X';
  btn.className = 'deleteBtn';
  btn.onclick = () => {
    deleteTodo(id);
  };

  //Appending all the elements to the todo div
  todo.append(checkBox, label, btn);
  todosContainer.append(todo);
};

const deleteTodo = (id: string) => {
  const index = todos.findIndex((item) => item.id === id);
  todos.splice(index, 1);
  renderTodo(todos);
};
const renderTodo = (todos: Todo[]) => {
  todosContainer.innerHTML = '';
  todos.forEach((item) => {
    generateTodoItem(item.title, item.isCompleted, item.id);
  });
};
