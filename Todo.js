const addelem = document.getElementById('add');
const removeelem = document.getElementById('remove');
const editelem = document.getElementById('edit');
const selectelem = document.getElementById('select');
const importantelem = document.getElementById('important');
const Very_importantelem = document.getElementById('Very_important');
const Ordinaryelem = document.getElementById('Ordinary');
const TickTodolem = document.getElementById('TickTodo');
const removeTickElem = document.getElementById('remove-tick');
const subButtons = document.getElementsByClassName('Sub-buttons');

let todos = [];

function loadTodos() {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    storedTodos.forEach(todoData => {
        let newdiv = createTodoElement(todoData.text, todoData.selected, todoData.color, todoData.Tick);
        document.body.append(newdiv);
        todos.push(newdiv);
    });
}

function createTodoElement(todoText, selected = false, color = 'white', Tick = false) {
    const newdiv = document.createElement('div'); 
    newdiv.textContent = todoText;
    newdiv.classList.add('todo-item');

    if (selected) {
        newdiv.classList.add('selected');
    }

    newdiv.style.color = color;

    if (Tick) {
        let tick = document.createElement('span');
        tick.innerHTML = '✔️';
        tick.classList.add('tick');
        newdiv.appendChild(tick);
    }

    let selectedLabel = document.createElement('span');
    selectedLabel.textContent = ' selected';
    selectedLabel.style.display = selected ? 'inline' : 'none';
    selectedLabel.style.fontSize = 'small';
    newdiv.appendChild(selectedLabel);

    newdiv.addEventListener('click', function () {
        newdiv.classList.toggle('selected');
        selectedLabel.style.display = newdiv.classList.contains('selected') ? 'inline' : 'none';
        updateSubButtonsVisibility();
    });

    selectelem.addEventListener('click', function() {
        todos.forEach(todo => {
            todo.classList.remove('selected');
        });
        updateSubButtonsVisibility();
    });

    newdiv.style.marginLeft = '500px';
    return newdiv;
}

function updateSubButtonsVisibility() {
    let selectedTodos = todos.some(todo => todo.classList.contains('selected'));
    for (let btn of subButtons) {
        btn.style.display = selectedTodos ? 'inline' : 'none';
    }
}

addelem.addEventListener('click', AddTodo);
removeelem.addEventListener('click', RemoveTodo);
editelem.addEventListener('click', EditTodo);
importantelem.addEventListener('click', important);
Very_importantelem.addEventListener('click', Very_important);
Ordinaryelem.addEventListener('click', Ordinary);
TickTodolem.addEventListener('click', TickTodo);
removeTickElem.addEventListener('click', removeTick);

function AddTodo() {
    let newevent = prompt('New Todo: ');
    if (newevent) {
        let newdiv = createTodoElement(newevent);
        document.body.append(newdiv);
        todos.push(newdiv);
        saveData(); 
    } else {
        alert('لطفا نام تودؤ جدید انتخاب کنید');
    }
}

function RemoveTodo() {
    todos = todos.filter(todo => {
        if (todo.classList.contains('selected')) {
            todo.remove();
            return false;
        }
        return true;
    });
    updateSubButtonsVisibility();
    saveData();
}

function EditTodo() {
    let selectedTodo = todos.find(todo => todo.classList.contains('selected'));
    if (selectedTodo) {
        let newtodo = prompt('Input new todo: ');
        if (newtodo) {
            const selectedLabel = selectedTodo.querySelector('span');
            selectedTodo.textContent = newtodo;
            selectedTodo.appendChild(selectedLabel);
            saveData();
        } else {
            alert('لطفا نام جدید تودؤ مورد نظر خود را انتخاب کنید');
        }
    } else {
        alert('لطفاً یک تودو را برای ویرایش انتخاب کنید');
    }
}

function important() {
    todos.forEach(todo => {
        if (todo.classList.contains('selected')) {
            todo.style.color = 'aqua';
        }
    });
    saveData();
}

function Very_important() {
    todos.forEach(todo => {
        if (todo.classList.contains('selected')) {
            todo.style.color = '#ff5c33';
        }
    });
    saveData();
}

function Ordinary() {
    todos.forEach(todo => {
        if (todo.classList.contains('selected')) {
            todo.style.color = 'white';
        }
    });
    saveData();
}

function TickTodo() {
    todos.forEach(todo => {
        if (todo.classList.contains('selected')) {
            if (!todo.querySelector('.tick')) {
                let tick = document.createElement('span');
                tick.textContent = '✔️'; 
                tick.classList.add('tick');
                todo.appendChild(tick); 
            }
        }
    });
    saveData();
}

function removeTick() {
    todos.forEach(todo => {
        if (todo.classList.contains('selected')) {
            const tick = todo.querySelector('.tick');
            if (tick) {
                tick.remove();
            }
        }
    });
    saveData();
}

function saveData() {
    const todosData = todos.map(todo => {
        return {
            text: todo.textContent.replace(' selected', '').replace('✔️', '').trim(),
            selected: todo.classList.contains('selected'),
            color: todo.style.color,
            Tick: !!todo.querySelector('.tick')
        };
    });
    localStorage.setItem('todos', JSON.stringify(todosData));
}

// بارگذاری تودوها در زمان بارگذاری صفحه
loadTodos();
