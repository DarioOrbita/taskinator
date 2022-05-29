
var formEl = document.querySelector("#task-form");

var tasksToDoEl = document.querySelector("#tasks-to-do");

var taskFormHandler = function(event) {

    event.preventDefault();

    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    if (!taskNameInput || !taskTypeInput) {

        alert("You need to fill out the task form.");

        return false;

    }

    //turn the data into an object to pass an an argument
    var taskDataObj = {

        name: taskNameInput,
        type: taskTypeInput,

    };

    //send it as an argument to createTaskEl
    createTaskEl(taskDataObj);

    formEl.reset();
    
}


//new code
var createTaskEl = function(taskDataObj) {
    
    //creates a list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    //creates a div with the task info type
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";

    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    //adds the task info to the new list element
    listItemEl.appendChild(taskInfoEl);
    
    //adds the new list element to the full list
    tasksToDoEl.appendChild(listItemEl);

}


formEl.addEventListener("submit", taskFormHandler);