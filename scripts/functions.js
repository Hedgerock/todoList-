const todos = [];

function renderTodoList (data, parentEl, count) {
    if (!checkedValidArgs(data, parentEl)) {
        return;
    }

    const todoContent = document.forms.addTodoForm.todoContent;

    saveData(count, todoContent.value)

    parentEl.innerHTML = initTodoEl(data);

    const todoItemCompleted = document.querySelectorAll('.todo-item__completed');
    const delBtn = document.querySelectorAll('.todo-item__delBtn');

    if (!todoItemCompleted.length) {
        return;
    } 

    updateData(data, todoItemCompleted);
    initDeleteTodoEl(data, delBtn);
}

function checkedValidArgs(data, parentEl) {
    if(!parentEl) {
        console.warn(`${parentEl} not found`)
        return;
    }

    if(!Array.isArray(data)) {
        console.warn('Arg data must be Array');
        return;
    }

    return true;
}

function initTodoEl(arr) {
    let todoItems = arr
    .map(function(item, index) {
        const todoItem = `
        <li class="todo-item ${item.completed ? 'todo-item_completed' : ''}" data-id = "${item.id}">
            <span class="todo-item__number mr-1">${index + 1}</span>
            <input 
                type="checkbox" ${item.completed ? 'checked' : ''}
                class="todo-item__completed mr-1"
                name = "checkboxEl">
            <p class="todo-item__text mr-1">${item.text}</p>
            <button class="todo-item__delBtn">del</button>
        </li>
        `;
        return todoItem })
    .join('');
    return todoItems;
}

function saveData(count, value) {
    if (count!== undefined) {
        todos.push({id: count, text: value, completed: false})
    };
}

function updateElCount() {
    const update = document.querySelectorAll('.todo-item');
    update.forEach(function(item, index) {
        const updatedEl = item.querySelector('.todo-item__number');
        updatedEl.textContent = index + 1;
    })
}

function updateData(arr, inputs) {
    inputs.forEach(function(input) {
        input.onchange = function() {
            const id = this.parentElement.dataset.id
            const todo = arr.find(function(t) {
                return t.id == id;
            })
    
            if (!todo) {
                return;
            }
    
            todo.completed = !todo.completed;
            this.parentElement.classList.toggle('todo-item_completed');
        }
    })
}

function initDeleteTodoEl(arr, btns) {

    btns.forEach(function(btn) {
        btn.onclick = function() {
            const id = this.parentElement.dataset.id
            const index = arr.findIndex(function(i) {return i.id == id});
            const parent = this.parentElement;
            const mainParent = parent.parentElement;

            if (index !== -1) {
                arr.splice(index, 1);
            }

            this.parentElement.remove();

            if (mainParent.children.length === 0) {
                const checkBoxFilter = document.querySelector('.todo-filter-label__input');
                const label = document.querySelector('.todo-filter-label');
                const todoInput = document.forms.addTodoForm.todoContent;

                renderTodoList(todos, todoListEl);
                todoInput.removeAttribute('disabled');
                todos.length = 0;
                checkBoxFilter.checked = false;
                renderTodoList(todos, todoListEl);
                initHiddenLabel(mainParent);
                label.classList.add('todo-filter-label_hidden');
            }
            updateElCount();
        }
    })
}

function initHiddenLabel(parentEl) {
    const label = document.querySelector('.todo-filter-label');

    if (parentEl.children.length === 0) {
        count = 1;
    } else {
        count++;
        label.classList.remove('todo-filter-label_hidden');
    }

    todoInput.value = '';
    submitBtn.setAttribute('disabled', '');
}

function checkUnfinishedTodo(input, btn) {
    const filteredArr = todos.filter(function(item) {
        return !item.completed;
    });

    if (checkBoxFilter.checked) {
        renderTodoList(filteredArr, todoListEl)
        input.setAttribute('disabled', '');
        input.value = '';
        btn.setAttribute('disabled', '');
    } else {
        renderTodoList(todos, todoListEl);
        input.removeAttribute('disabled');
    }
}