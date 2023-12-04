const todoListEl = document.querySelector('.todo-list');

const submitBtn = document.forms.addTodoForm.submitBtn;
const todoInput = document.forms.addTodoForm.todoContent;

let count = 0;

todoInput.oninput = function() {
    if (todoInput.value.trim().length > 0) {
        submitBtn.removeAttribute('disabled');
        return;
    }

    submitBtn.setAttribute('disabled', '');
}

submitBtn.onclick = function(e) {
    e.preventDefault();

    todoListEl.children.length === 0 
        ? count = 1 
        : count++

    renderTodoList(todos, todoListEl, count);
    todoInput.value = '';
    submitBtn.setAttribute('disabled', '');
}

console.log(todos);