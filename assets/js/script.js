var taskIdCounter = 0;

var tasksInProgressEl = document.querySelector("#tasks-in-progress");

var tasksCompletedEl = document.querySelector("#tasks-completed");

var formEl = document.querySelector("#task-form");

var tasksToDoEl = document.querySelector("#tasks-to-do");

var pageContentEl = document.querySelector("#page-content");



var tasks = [];



var taskFormHandler = function(event) {

    event.preventDefault();

    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    if (!taskNameInput || !taskTypeInput) {

        alert("You need to fill out the task form.");

        return false;

    }



    var isEdit = formEl.hasAttribute("data-task-id");
    
    if (isEdit) {

        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    }

    else {
        
        //turn the data into an object to pass as an argument
        var taskDataObj = {
    
            name: taskNameInput,
            type: taskTypeInput,
            status: "to do",
    
        };
        
        createTaskEl(taskDataObj);

    }


    formEl.reset();
    
};


var completeEditTask = function(taskName, taskType, taskId) {

    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    alert("Task Updated");

    for (let i = 0; i < tasks.length; i++) {

        if (tasks[i].id === parseInt(taskId)) {

            tasks[i].name = taskName;
            tasks[i].type = taskType;

        }

    };

    //reset the form box back to creating a new task
    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";

    saveTasks();

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

    taskDataObj.id - taskIdCounter;

    tasks.push(taskDataObj);

    //increment the unique ID counter for the next time an element is created
    taskIdCounter++;

    saveTasks();

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

    for (let i = 0; i < statusChoices.length; i++) {

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

    var updatedTaskArr = [];

    for (let i = 0; i < tasks.length; i++) {

        if (tasks[i].id !== parseInt(taskId)) {

            updatedTaskArr.push(tasks[i]);

        }

    }

    tasks = updatedTaskArr;

    saveTasks();

};


var editTask = function(taskId) {

    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    
    var taskType = taskSelected.querySelector("span.task-type").textContent;

    document.querySelector("input[name='task-name']").value = taskName;
    
    document.querySelector("select[name='task-type']").value = taskType;

    document.querySelector("#save-task").textContent = "Save Task";

    formEl.setAttribute("data-task-id", taskId);

};


var taskStatusChangeHandler = function(event) {

    var taskId = event.target.getAttribute("data-task-id");

    var statusValue = event.target.value.toLowerCase();

    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    if (statusValue === "to do") {

        tasksToDoEl.appendChild(taskSelected);

    }

    else if (statusValue === "in progress") {

        tasksInProgressEl.appendChild(taskSelected);

    }

    else if (statusValue === "completed") {

        tasksCompletedEl.appendChild(taskSelected);

    }

    for (i = 0; i < tasks.length; i++) {

        if (tasks[i].id === parseInt(taskId)) {

            tasks[i].status = statusValue;

        }

    }

    saveTasks();

};

var saveTasks = function() {

    localStorage.setItem("tasks", JSON.stringify(tasks));

};

// get task items from local storage
//convert tasks from the string format back into an array of objects
//iterates through task array and create task elements from it

var loadTasks = function() {

   tasks = localStorage.getItem("tasks", tasks);
   
   if (!tasks) {
       
       tasks = [];
       return false;
       
    }

    tasks = JSON.parse(tasks);
    
    //console.log(tasks);

    for (let i = 0; i < tasks.length; i++) {
        tasks[i].id = taskIdCounter;
        
        listItemEl = document.createElement("li");
        listItemEl.className = "task-item";
        listItemEl.setAttribute("data-task-id", tasks[i].id);
        
        taskInfoEl = document.createElement("div");
        taskInfoEl.className = "task-info";
        taskInfoEl.innerHTML = "<h3 class='task-name'>" + tasks[i].name + "</h3><span class='task-type'>" + tasks[i].type + "</span>";
        
        listItemEl.appendChild(taskInfoEl);
        
        var taskActionsEl = createTaskActions(tasks[i].id);
        
        listItemEl.appendChild(taskActionsEl);
        
        debugger;
        console.log(tasks[i].name);
        if (tasks[i].status === "to do") {
            
            listItemEl.querySelector("select[name='status-change']").selectedIndex = 0;
            tasksToDoEl.appendChild(listItemEl);
            
        }
        
        else if (tasks[i].status === "in progress") {
            
            listItemEl.querySelector("select[name='status-change']").selectedIndex = 1;
            tasksInProgressEl.appendChild(listItemEl);

        }
        
        else if (tasks[i].status === "complete") {

            listItemEl.querySelector("select[name='status-change']").selectedIndex = 2;
            tasksCompletedEl.appendChild(listItemEl);

        }

        taskIdCounter++;

        console.log(tasks[i]);


    }
    
};

pageContentEl.addEventListener("click", taskButtonHandler);

pageContentEl.addEventListener("change", taskStatusChangeHandler);

formEl.addEventListener("submit", taskFormHandler);


loadTasks();
