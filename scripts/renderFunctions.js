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

function initSortById(arr) {
    if (arr.length === 0) {
        return null;
    }

    const arrId = [];

    for (let i = 0; i < arr.length; i++) {
        arrId.push(arr[i].id);
    }

    const maxEl = arrId.sort((a,b) => Number(b) - Number(a));

    return maxEl[0];
}

function initSortByCompleted(arr) {
    return arr.sort(function(a,b) {
        return a.completed - b.completed;
    })
}

function updateData(inputs) {
    inputs.forEach(function(input) {
        input.onchange = function() {
            const id = this.parentElement.dataset.id
            const parent = this.parentElement;
            const todo = todos.find(function(t) {
                return t.id == id;
            })
    
            if (!todo) {
                return;
            }

            todo.completed = !todo.completed;
            this.parentElement.classList.toggle('todo-item_completed');
            initSortByCompleted(todos)

            if (input.checked) {
                parent.style.transform = 'translateY(0)'
                initCheckedAnimation(parent, '100%');
            } else {
                parent.style.transform = 'translateY(80%)'
                initCheckedAnimation(parent, '-100%');
            }

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
            
            initDeletingAnimation(parent, mainParent);

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