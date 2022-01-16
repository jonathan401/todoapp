// global variables
const todoContainer = document.querySelector('.todos');
const addForm = document.querySelector('form.addform');
const filterForm = document.querySelector('form.search');
const deleteBtn = document.querySelector('.delete');

// defining a function that will get all todos
const getTodos = () => {
    const todos = document.querySelectorAll('.todos li');
    return todos;
};

// function to generate template for the todos
const generateTemplate = (string) => {
    const html = `
    <li>
    <span>${string}</span>
    <i class="fas fa-trash delete"></i>
    </li>
    `;
    todoContainer.innerHTML += html;
};


// function to update the html with data from local storage
const updateUi = () => {
    /* created a variable that gets all the values from local storage by accessing them 
    and then i loop through all of them and pass them to the generateTemplate function that adds all of them to 
    the dom */
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    storedTodos.forEach(item => {
        generateTemplate(item);
    });
};


// function to filter the todos 
filterForm.addEventListener('keyup', e => {
    e.preventDefault();
    const filterValue = filterForm.search.value.trim();
    let results = getTodos();
    results.forEach(result => {
        if(!result.textContent.toLowerCase().includes(filterValue.toLowerCase())) {
            result.classList.add('hide');
        } else {
            result.classList.remove('hide');
        }
    })
});

// function to stop the filter field from reloading the page from refreshing
filterForm.addEventListener('submit', e => {
    e.preventDefault();
});

// function to update the local storage with the current todos
const updateStorage = () => {
    /* i created an empty array and then call the getTodos function which gets all the todos that are present 
    in the html and then convert all of them to JSON string and store them in the user's local storage using the 
    key 'todos' as the key */
    const todosArr = [];
    let todos = getTodos();
    todos.forEach(todo => {
        todosArr.push(todo.textContent.trim());
    });
    const todoContent = JSON.stringify(todosArr);
    localStorage.setItem('todos', todoContent);
};


// form input
addForm.addEventListener('submit', e => {
    e.preventDefault();
    const todo = addForm.todo.value.trim();
    addForm.reset();
    if(todo.length) {
        generateTemplate(todo);
    }
    updateStorage();
});

// adding a delete functionality to the todos
todoContainer.addEventListener('click', e => {
    if(e.target.classList.contains('delete')){
        console.log(e.target.parentElement)
        e.target.parentElement.remove();
    }
    updateStorage();
});

// updating the Ui
updateUi();
