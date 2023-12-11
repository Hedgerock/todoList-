const todoListEl = document.querySelector('.todo-list');

const submitBtn = document.forms.addTodoForm.submitBtn;
const removeAllBtn = document.forms.addTodoForm.removeAllBtn;

const todoInput = document.forms.addTodoForm.todoContent;

const checkBoxFilter = document.querySelector('.todo-filter-label__input');
let isChecked = checkBoxFilter.checked;

let lastId = todos.length 
  ? initSortById(todos)
  : 0;


todosLengthValidation()

checkCheckBoxStatus(checkBoxFilter);

checkChildrenLength(todoListEl)

renderTodoList(todos, todoListEl);

setMaxLengthContent();

todoInput.oninput = function() {
    setMaxLengthContent();

    if (todoInput.value.trim().length > 0) {
        submitBtn.removeAttribute('disabled');
        return;
    }

    submitBtn.setAttribute('disabled', '');
}

checkBoxFilter.onchange = function() {
    isChecked = this.checked;

    const delBtn = document.querySelectorAll('.todo-item__delBtn');
    setDisabledToDltBtns(isChecked, delBtn)

    if (isChecked) {
        checkboxAnimationCheckedOnly();
        saveToLocalStorage();
        return;
    }

    checkUnfinishedTodo(todos, todoInput, isChecked);

    initHiddenLabel(todoListEl);

    renderTodoList(todos, todoListEl);


    if (!isChecked) {
        checkboxAnimation();
    }

    saveToLocalStorage()
}

removeAllBtn.onclick = function() {
    checkBoxFilter.checked = false;
    localStorage.setItem('checkboxState', checkBoxFilter.checked);
    removeAllBtn.setAttribute('disabled', '');

    todos.length = 0;

    initHiddenLabel(todoListEl);

    removeAllAnimation();

    checkChildrenLength();
    
    saveToLocalStorage();
}


submitBtn.onclick = function(e) {
    e.preventDefault();

    saveData();

    checkUnfinishedTodo(todos, todoInput, isChecked);

    renderTodoList(todos, todoListEl);
    initHiddenLabel(todoListEl);

    initAddingAnimation();

    saveToLocalStorage();

    todosLengthValidation();
}

function saveData() {
    const text = todoInput.value;
    const id = ++lastId;
    const newTodo = {
    id: id,
    text: text,
    completed: false,
    }
    todos.unshift(newTodo);
}

console.log(todos);

console.log(initSortById(todos))