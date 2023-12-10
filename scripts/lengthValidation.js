function setMaxLengthContent () {
    const textArea = document.forms.addTodoForm.todoContent;
    const currentValue = document.querySelector('.content__value_current');

    currentValue.textContent = textArea.value.trim().replaceAll(' ', '').length;
}

function checkChildrenLength() {
    const label = document.querySelector('.todo-filter-label');

    todos.length > 0
        ? label.classList.remove('todo-filter-label_hidden')
        : label.classList.add('todo-filter-label_hidden')
}

function todosLengthValidation() {
    todos.length > 0 
        ? removeAllBtn.removeAttribute('disabled')
        : removeAllBtn.setAttribute('disabled', '');
}