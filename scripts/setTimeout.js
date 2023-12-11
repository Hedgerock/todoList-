function initAddingAnimation() {
    const firstChild = document.querySelector('.todo-item:first-child');
    firstChild.style.opacity = 0;
    firstChild.style.transform = 'translateX(-50%)'

    setTimeout(() => {
        firstChild.style.transition = 'all 1s';
        firstChild.style.opacity = 1;
        firstChild.style.transform = 'translateX(0)'

        setTimeout(() => {
            firstChild.removeAttribute('style');
        }, 1000);

    }, 100)
}

function initDeletingAnimation(parent, mainParent) {
    parent.style.opacity = 1;
    parent.style.transform = 'translateX(0)';
    parent.style = 'pointer-events: none';

    setTimeout(() => {
        parent.style.transition = 'all 1s';
        parent.style.opacity = 0;
        parent.style.transform = 'translateX(50%)'

        setTimeout(() => {
            parent.removeAttribute('style');
            parent.remove();

            if (mainParent.children.length === 0) {
                const label = document.querySelector('.todo-filter-label');
                label.classList.add('todo-filter-label_hidden');
                todosLengthValidation();
            }

            updateElCount();
        }, 1000);

    }, 100)
}


function initCheckedAnimation(parent, translate) {
    setTimeout(() => {
        parent.style.transition = 'all 1s';
        parent.style.transform = `translateY(${translate})`
        parent.style.opacity = 0;

        setTimeout(() => {
            parent.removeAttribute('style');
            renderTodoList(todos, todoListEl);
        }, 1000);

    }, 100)
}

function checkboxAnimationCheckedOnly () {
    const finishedTodos = document.querySelectorAll('.todo-item_completed');
        finishedTodos.forEach(item => {
            item.style.opacity = 1;
            item.style.transform = 'translateX(0)'
    
            setTimeout(() => {
                item.style.transition = 'all 1s';
                item.style.opacity = 0;
                item.style.transform = 'translateX(100%)';
    
                setTimeout(() => {
                    item.removeAttribute('style');
                    checkUnfinishedTodo(todos, todoInput, isChecked);
                    initHiddenLabel(todoListEl);
                    renderTodoList(todos, todoListEl);
                }, 1200);
    
            }, 400)
        })
}

function checkboxAnimation() {
    const finishedTodos = document.querySelectorAll('.todo-item_completed');

    finishedTodos.forEach(item => {
        item.style.opacity = 0;
        item.style.transform = 'translateX(-100%)'

        setTimeout(() => {
            item.style.transition = 'all 1s';
            item.style.opacity = 1;
            item.style.transform = 'translateX(0)';

            setTimeout(() => {
                item.removeAttribute('style');
            }, 1200);

        }, 100)
    })
}


function removeAllAnimation() {
    const allTodos = document.querySelectorAll('.todo-item');
    allTodos.forEach(item => {
        item.style.transform = 'translateX(0)'
        item.style.opacity = 1;

        setTimeout(() => {
            item.style.transition = 'all 1s';
            item.style.transform = 'translateX(100%)'
            item.style.opacity = 0;

            setTimeout(() => {
                item.removeAttribute('style');
                renderTodoList(todos, todoListEl);
            }, 1500);

        }, 400)
    })
}

