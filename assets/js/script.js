
var formEl = document.querySelector("#task-form");

var tasksToDoEl = document.querySelector("#tasks-to-do");

var createTaskHandler = function(event) {

    event.preventDefault();

    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    
    //creates a list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    //creates a div with the task info type
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";

    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";

    //adds the task info to the new list element
    listItemEl.appendChild(taskInfoEl);
    
    //adds the new list element to the full list
    tasksToDoEl.appendChild(listItemEl);
    
}

formEl.addEventListener("submit", createTaskHandler);