const todoListEl = document.querySelector('.todo-list');

const submitBtn = document.forms.addTodoForm.submitBtn;
const todoInput = document.forms.addTodoForm.todoContent;

const checkBoxFilter = document.querySelector('.todo-filter-label__input');

let count = 1;

todoInput.oninput = function() {
    if (todoInput.value.trim().length > 0) {
        submitBtn.removeAttribute('disabled');
        return;
    }

    submitBtn.setAttribute('disabled', '');
}

submitBtn.onclick = function(e) {
    e.preventDefault();

    renderTodoList(todos, todoListEl, count);
    initHiddenLabel(todoListEl);
    
    if (todoListEl.children.length === 0) {
        updateElCount();
    }
}

checkBoxFilter.onchange = function() {
    checkUnfinishedTodo(todoInput, submitBtn)
}

console.log(todos);