const addButton = document.querySelector(".btn");
const inputBox = document.querySelector(".input_box");
const todoList = document.querySelector(".todo_list");
// Function to create a new todo item
function createTodoItem(text) {
    const li = document.createElement("li");
    const todoText = document.createElement("span");
    todoText.textContent = text;
    const Done = document.createElement("button");
    Done.textContent = "Done";
    Done.classList.add("Done");
    Done.addEventListener("click", function() {
        todoText.classList.toggle("done");
        saveTodoItems()
    });
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete");
    deleteButton.addEventListener("click", function() {
        li.remove();
        saveTodoItems()
    });
    li.appendChild(todoText);
    li.appendChild(Done);
    li.appendChild(deleteButton);
    todoList.appendChild(li);
    saveTodoItems()
}
// Event listener for add button
addButton.addEventListener("click", function() {
    if (inputBox.value.trim() !== "") {
        createTodoItem(inputBox.value.trim());
        inputBox.value = "";
    }
});
// function saveTodoItems() {
//         localStorage.setItem("todos", todo_list.innerHTML);
// }
// function TodoItems() {
//     todoList.innerHTML = localStorage.getItem("todos");
// }
// TodoItems();
function saveTodoItems() {
    const todos = [];
    document.querySelectorAll(".todo_list li").forEach(function(item) {
        todos.push({
            text: item.querySelector("span").textContent,
            done: item.querySelector(".Done").classList.contains("done")
        });
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}
function loadTodoItems() {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.forEach(function(todo) {
        createTodoItem(todo.text);
        if (todo.done) {
            document.querySelector(".todo_list li:last-child span").classList.add("done");
        }
    });
}
loadTodoItems();