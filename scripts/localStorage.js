function saveToLocalStorage() {
    const jsonData = JSON.stringify(todos);

    localStorage.setItem('todos', jsonData);
}

function checkCheckBoxStatus(chk) {

    chk.addEventListener('change', function() {
        localStorage.setItem('checkboxState', chk.checked);
    });

    window.addEventListener('load', function() {
        const savedState = localStorage.getItem('checkboxState');
        if (savedState !== null) {
            chk.checked = savedState === 'true';
            checkUnfinishedTodo(todos, todoInput, chk.checked);
            renderTodoList(todos, todoListEl);
        }
    });    
}