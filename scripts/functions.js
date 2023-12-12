const todos = JSON.parse(localStorage.getItem('todos')) || [];

function renderTodoList (rawData, parentEl) {
    if (!checkedValidArgs(rawData, parentEl)) {
        return;
    }

    const todoContent = document.forms.addTodoForm.todoContent;
    const checkBoxFilter = document.querySelector('.todo-filter-label__input').checked;

    const data = checkUnfinishedTodo(rawData, todoContent, checkBoxFilter)

    initSortByCompleted(data)

    parentEl.innerHTML = initTodoEl(data);

    const todoItemCompleted = document.querySelectorAll('.todo-item__completed');
    const delBtn = document.querySelectorAll('.todo-item__delBtn');

    setDisabledToDltBtns(checkBoxFilter, delBtn)

    if (!todoItemCompleted.length) {
        return;
    } 

    updateData(todoItemCompleted);

    initDeleteTodoEl(delBtn);
    saveToLocalStorage();
}