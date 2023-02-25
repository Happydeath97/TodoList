// Model section (for save data)
// If locastorage has a todos array, use it
let todos;
// load localstorage and check if its array
const savedTodos = JSON.parse(localStorage.getItem('todos'));

if (Array.isArray(savedTodos)) {
  todos = savedTodos;
} else {
  todos = [{
    title: 'Get groceries',
    dueDate: '2023-3-1',
    id: 'id1',
    isDone: false,
    isEditing: undefined
    }, {
    title: 'Wash car',
    dueDate: '2023-3-1',
    id: 'id2',
    isDone: true,
    isEditing: undefined
    }, {
    title: 'Make dinner',
    dueDate: '2023-3-1',
    id: 'id3',
    isDone: false,
    isEditing: undefined
    }, {
    title: 'Do laundry',
    dueDate: '2023-3-1',
    id: 'id4',
    isDone: false,
    isEditing: undefined
    }];
};

// create todo
function createTodo(title, dueDate) {
  const id = new Date().getTime().toString();

  todos.push({
    title: title,
    dueDate: dueDate,
    id: id,
    isDone: false,
    isEditing: undefined
  });

  saveTodos();
};

// delete todo
function removeTodo(idToDelete) {
  todos = todos.filter(todo => {

    return todo.id !== idToDelete;

  });

  saveTodos();
};

// change todo status
function changeStatus(idOfCheckbox, checkBoxStatus) {

  todos.forEach(todo => {
    if(todo.id == idOfCheckbox) {
      todo.isDone = checkBoxStatus;
    };
  });

  saveTodos();
};

function changeEditStatus(idToChange) {
  todos.forEach(todo => {
    if(todo.id == idToChange) {
      todo.isEditing = true;
    };
  });

  saveTodos();
};

// update todo
function updateTodo(id, title, dueDate) {
  todos.forEach(todo => {
    if(todo.id == id) {
      todo.title = title;
      todo.dueDate = dueDate;
          todo.isEditing=  false;
    };
  });

  saveTodos();
    };

    function saveTodos() {
      localStorage.setItem('todos', JSON.stringify(todos));
    };

// View section (for drawing on the screen)
function render() {
  // reset our list
  const todoList = document.getElementById('todo-list');
  todoList.innerHTML = '';

  todos.forEach(function (todo) {
    const element = document.createElement('div');
    element.className = 'todo-row';
        

    if(todo.isEditing === true) {
      const editInput = document.createElement('input');
      const editTime = document.createElement('input');
      const updateButton = document.createElement('button');

      editInput.type = 'text';
      editInput.id = `${todo.id}-text`;
      editInput.className = 'input-bar';
      element.appendChild(editInput);

      editTime.type = 'date';
      editTime.id = `${todo.id}-date`;
      editTime.className = 'input-date';
      editTime.style = 'margin-left: 4px;';
      element.appendChild(editTime);
          
      updateButton.innerText = 'UPDATE';
      updateButton.className = 'update-button';
      updateButton.onclick = changeTodo;
      updateButton.id = `${todo.id}`
      element.appendChild(updateButton);

    } else {

      element.innerText = `${todo.title} ${todo.dueDate}`;

      const editButton = document.createElement('button');
      editButton.innerText = 'EDIT';
      editButton.className = 'edit-button';
      editButton.onclick = editTodoStatus;
      editButton.id = todo.id;
      element.appendChild(editButton);

      const delButton = document.createElement('button');
      delButton.innerText = 'DELETE';
      delButton.className = 'del-button';
      delButton.onclick = delTodo;
      delButton.id = todo.id;
      element.appendChild(delButton);

      const checkBox = document.createElement('input');
      checkBox.type = 'checkbox';
      checkBox.checked = todo.isDone;
      checkBox.id = todo.id;
      checkBox.onchange = todoStatus;

      element.prepend(checkBox);

    };

    todoList.appendChild(element);
  });
};


// Controller section
function delTodo(event) {
  const delButton = event.target;
  const idToDelete = delButton.id;
      
  removeTodo(idToDelete);

  render();
};

function addTodo() {
  const textbox = document.getElementById('todo-item');
  const title = textbox.value;

  const datePicker = document.getElementById('date-picker');
  const dueDate = datePicker.value;

  createTodo(title, dueDate);

  render();
};

function todoStatus(event) {
  const checkBox = event.target;
  const checkBoxStatus = checkBox.checked;
  const idOfCheckbox = checkBox.id;

  changeStatus(idOfCheckbox, checkBoxStatus);
};

function editTodoStatus(event) {
  const editButton = event.target;
  const idToChange = editButton.id;

  changeEditStatus(idToChange);

  render();
};

function changeTodo(event) {
  const updateButton = event.target;
  const id = updateButton.id;

  const textbox = document.getElementById(`${id}-text`)
  const title = textbox.value;
      
  const datePicker = document.getElementById(`${id}-date`);
  const dueDate = datePicker.value;

  updateTodo(id, title, dueDate);

  render();
};

render();
