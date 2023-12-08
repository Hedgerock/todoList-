const todoListEl = document.querySelector('.todo-list');

const submitBtn = document.forms.addTodoForm.submitBtn;
const removeAllBtn = document.forms.addTodoForm.removeAllBtn;

const todoInput = document.forms.addTodoForm.todoContent;

const checkBoxFilter = document.querySelector('.todo-filter-label__input');
let isChecked = checkBoxFilter.checked;

let lastId = todos.length 
  ? todos[todos.length - 1].id
  : 0;


todosLengthValidation()

todoInput.oninput = function() {
    setMaxLengthContent();

    if (todoInput.value.trim().length > 0) {
        submitBtn.removeAttribute('disabled');
        return;
    }

    submitBtn.setAttribute('disabled', '');
}

checkBoxFilter.onchange = function() {

    checkUnfinishedTodo(todos, todoInput, isChecked);
    initHiddenLabel(todoListEl);
    renderTodoList(todos, todoListEl);

    saveToLocalStorage()
}

removeAllBtn.onclick = function() {
    checkBoxFilter.checked = false;
    localStorage.setItem('checkboxState', checkBoxFilter.checked);
    removeAllBtn.setAttribute('disabled', '');
    todos.length = 0;
    initHiddenLabel(todoListEl);
    renderTodoList(todos, todoListEl);
    checkChildrenLength();
    saveToLocalStorage();
}


submitBtn.onclick = function(e) {
    e.preventDefault();

    saveData();

    checkUnfinishedTodo(todos, todoInput, isChecked);

    renderTodoList(todos, todoListEl);
    initHiddenLabel(todoListEl);

    saveToLocalStorage()

    todosLengthValidation();
}

checkCheckBoxStatus(checkBoxFilter);

checkChildrenLength(todoListEl)

renderTodoList(todos, todoListEl);

setMaxLengthContent();

function saveData() {
    const text = todoInput.value;
    const id = ++lastId;
    const newTodo = {
    id: id,
    text: text,
    completed: false,
    }
    todos.push(newTodo);
}

console.log(todos);