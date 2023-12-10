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

    setDisabledToDltBtns(checkBoxFilter, delBtn);

    if (!todoItemCompleted.length) {
        return;
    } 

    updateData(todoItemCompleted);

    initDeleteTodoEl(delBtn);
    saveToLocalStorage();
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

function updateElCount() {
    const update = document.querySelectorAll('.todo-item');
    update.forEach(function(item, index) {
        const updatedEl = item.querySelector('.todo-item__number');
        updatedEl.textContent = index + 1;
    })
}

function updateData(inputs) {
    inputs.forEach(function(input) {
        input.onchange = function() {
            const todoListEl = document.querySelector('.todo-list');
            const id = this.parentElement.dataset.id
            const todo = todos.find(function(t) {
                return t.id == id;
            })
    
            if (!todo) {
                return;
            }
    
            todo.completed = !todo.completed;
            this.parentElement.classList.toggle('todo-item_completed');

            initSortByCompleted(todos)
            renderTodoList(todos, todoListEl);
            saveToLocalStorage();
        }
    })
}

function initDeleteTodoEl(btns) {

    btns.forEach(function(btn) {
        btn.onclick = function() {
            const id = this.parentElement.dataset.id
            const index = todos.findIndex(function(i) {return i.id == id});
            const parent = this.parentElement;
            const mainParent = parent.parentElement;

            if (index !== -1) {
                todos.splice(index, 1);
            }

            this.parentElement.remove();

            if (mainParent.children.length === 0) {
                const label = document.querySelector('.todo-filter-label');
                label.classList.add('todo-filter-label_hidden');
                todosLengthValidation();
            }

            updateElCount();
            saveToLocalStorage();
        }
    })
}

function initHiddenLabel(parentEl) {
    const label = document.querySelector('.todo-filter-label');

    if (parentEl.children.length !== 0) {
        label.classList.remove('todo-filter-label_hidden');
    }

    todoInput.value = '';
    setMaxLengthContent();
    updateElCount();
    submitBtn.setAttribute('disabled', '');
}

function checkUnfinishedTodo(data, input, chk) {
    let filteredTodos = [];
    if (chk) {
      filteredTodos = data.filter(function(todo) {
        return !todo.completed;
      });
      input.value = '';
    } else {
      filteredTodos = data.filter(function(todo) {
        return todo;
      });
    }
    return filteredTodos;
}

function setDisabledToDltBtns(booleanValue ,btns) {
    if (booleanValue) {
        btns.forEach(function(item) {
            item.setAttribute('disabled', '');
        })
    } else {
        btns.forEach(function(item) {
            item.removeAttribute('disabled');
        })
    }
}

function initSortByCompleted(arr) {
    return arr.sort(function(a,b) {
        return a.completed - b.completed;
    })
}

function setMaxLengthContent () {
    const textArea = document.forms.addTodoForm.todoContent;
    const currentValue = document.querySelector('.content__value_current');

    currentValue.textContent = textArea.value.trim().replaceAll(' ', '').length;
}


function saveToLocalStorage() {
    const jsonData = JSON.stringify(todos);

    localStorage.setItem('todos', jsonData);
}

function checkChildrenLength() {
    const label = document.querySelector('.todo-filter-label');

    todos.length > 0
        ? label.classList.remove('todo-filter-label_hidden')
        : label.classList.add('todo-filter-label_hidden')
}

function checkCheckBoxStatus(chk) {

    chk.addEventListener('change', function() {
        localStorage.setItem('checkboxState', chk.checked);
    });

    window.addEventListener('load', function() {
        const savedState = localStorage.getItem('checkboxState');
        if (savedState !== null) {
            chk.checked = savedState === 'true';
            checkUnfinishedTodo(todos, todoInput, isChecked);
            renderTodoList(todos, todoListEl);
        }
    });

}

function todosLengthValidation() {
    todos.length > 0 
        ? removeAllBtn.removeAttribute('disabled')
        : removeAllBtn.setAttribute('disabled', '');
}