const todoListEl = document.querySelector('.todo-list');

const submitBtn = document.forms.addTodoForm.submitBtn;
const removeAllBtn = document.forms.addTodoForm.removeAllBtn;

todosLengthValidation()

const todoInput = document.forms.addTodoForm.todoContent;

const checkBoxFilter = document.querySelector('.todo-filter-label__input');
let isChecked = checkBoxFilter.checked;

let count = 1;

checkCheckBoxStatus(checkBoxFilter)

checkChildrenLength(todoListEl)

renderTodoList(todos, todoListEl, count);

setMaxLengthContent();

todoInput.oninput = function() {
    setMaxLengthContent();

    if (todoInput.value.trim().length > 0) {
        submitBtn.removeAttribute('disabled');
        return;
    }

    submitBtn.setAttribute('disabled', '');
}

removeAllBtn.onclick = function() {
    checkBoxFilter.checked = false;
    removeAllBtn.setAttribute('disabled', '');

    if (todos.length > 0) {
        todos.length = 0;
        checkUnfinishedTodo(todos, todoInput, isChecked);
        renderTodoList(todos, todoListEl, count);
        checkChildrenLength();
        count = 1;
        saveToLocalStorage();
        return;
    }
}

submitBtn.onclick = function(e) {
    e.preventDefault();

    checkUnfinishedTodo(todos, todoInput, isChecked);

    renderTodoList(todos, todoListEl, count);
    initHiddenLabel(todoListEl);

    saveToLocalStorage()

    todosLengthValidation();
}

checkBoxFilter.onchange = function() {

    checkUnfinishedTodo(todos, todoInput, isChecked);
    initHiddenLabel(todoListEl);
    renderTodoList(todos, todoListEl, count);

    saveToLocalStorage()
}

console.log(todos);