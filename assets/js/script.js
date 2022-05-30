var taskIdCounter = 0;

var formEl = document.querySelector("#task-form");

var tasksToDoEl = document.querySelector("#tasks-to-do");

var pageContentEl = document.querySelector("#page-content");

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
    
};


//generates a new task based on the user input
var createTaskEl = function(taskDataObj) {
    
    //creates a list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    //add a unique data id attribute to the list element
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    //creates a div with the task info type
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";

    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    //adds the task info to the new list element
    listItemEl.appendChild(taskInfoEl);
    
    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);
    //adds the new list element to the full list
    tasksToDoEl.appendChild(listItemEl);

    //increment the unique ID counter for the next time an element is created
    taskIdCounter++;

};

var createTaskActions = function(taskId) {

    //creates a div to hold the new task action elements
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    //creates an edit button and appends it to the div container
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);

    //creates a delete button and appends it to the div container
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    //creates a dropdown selector and appends it to the div container
    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    var statusChoices = ["To Do", "In Progress", "Completed"];

    for (i = 0; i < statusChoices.length; i++) {

        //creats option elements and appends them to the status selector
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

        statusSelectEl.appendChild(statusOptionEl);

    }

    actionContainerEl.appendChild(statusSelectEl);

    return actionContainerEl;

};

var taskButtonHandler = function(event) {

    //get target from event
    var targetEl = event.target;

    //if edit button was clicked
    if (targetEl.matches(".edit-btn")) {

        var taskId = targetEl.getAttribute("data-task-id");

        editTask(taskId);

    } 
    
    //if delete button was clicked
    else if (targetEl.matches(".delete-btn")) {

        var taskId = targetEl.getAttribute("data-task-id");

        deleteTask(taskId);

    }

};

var deleteTask = function(taskId) {

    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    taskSelected.remove();

};

var editTask = function(taskId) {

    console.log("editing task #" + taskId);

    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    
    var taskType = taskSelected.querySelector("span.task-type").textContent;
   
    document.querySelector("input[name='task-name']").value = taskName;
    
    document.querySelector("select[name='task-type']").value = taskType;

    document.querySelector("#save-task").taskContent = "Save Task";

    formEl.setAttribute("data-task-id", taskId);

}

pageContentEl.addEventListener("click", taskButtonHandler);

formEl.addEventListener("submit", taskFormHandler);