// Array to hold tasks
let tasks = [];
let completedTasks = [];

// Add a new task
function addTask() {
  const input = document.querySelector("#input");
  const taskText = input.value.trim();

  // Capitalize first letter
  let task = taskText.charAt(0).toUpperCase() + taskText.slice(1).toLowerCase();
  // clear input
  input.value = ""; 

  // Create a single error message if empty input    
  if (!taskText) {
    let existingError = document.querySelector(".error-message");
    if (!existingError){ 
        
    const messageBox = document.querySelector("#errorBox"); 
    const errorMessage = document.createElement("span"); 
    errorMessage.className = "error-message";
    messageBox.appendChild(errorMessage); 
    errorMessage.innerText = "Input must not be empty"; 
    }

    //Remove error message when user types into input
    const input = document.querySelector("#input");
    input.addEventListener("input", function() {
      const error = document.querySelector(".error-message");
      if (error) {
        error.remove();
      }
    });
    return;
  } 
  
  // Create list item
  const li = document.createElement("li");

  // Checkbox with google material icons
  const checkbox = document.createElement("span");
  
  //task text
  const textLabel = document.createElement("span");
  textLabel.className = "text-label";
  textLabel.textContent = task;


  // Close button with html code for trash can
  const trash = document.createElement("span");
  trash.className = "close";
  trash.innerHTML = "&#x1F5D1";


  // Put everything together

  li.appendChild(textLabel);
  li.appendChild(trash);

  document.querySelector("#taskList").appendChild(li);

  // Add to array + log added task, all tasks in list and completed tasks
  tasks.push(task);

  console.log("Added:", task);
  console.log("Uncompleted tasks", tasks);
  console.log("Completed tasks:", completedTasks);
}

// Event delegation for checkboxes and close buttons
document.getElementById("taskList").addEventListener("click", function(e) {
  if (e.target.classList.contains("text-label")) {
    toggleBox(e.target);
  }

  if (e.target.classList.contains("close")) {
    const li = e.target.parentElement;
    const taskLabel = li.querySelector(".text-label");
    const taskText = taskLabel.textContent;

    removeTask(taskText);
    li.remove();
  }
  
});

function toggleBox(el) {
  const li = el.parentElement;
  const taskText = el.textContent;

  // Check if task is already completed
  if (el.classList.contains("completed")) {
    // Mark as uncompleted
    el.classList.remove("completed");
    el.style.textDecoration = "none";

    completedTasks = completedTasks.filter(t => t !== taskText);
    if (!tasks.includes(taskText)) tasks.push(taskText);

    console.log("Marked as uncompleted:", taskText);
  } else {
    // Mark as completed
    el.classList.add("completed");
    el.style.textDecoration = "line-through";

    tasks = tasks.filter(t => t !== taskText);
    if (!completedTasks.includes(taskText)) completedTasks.push(taskText);

    console.log("Marked as completed:", taskText);
  }

  // Update completed tasks counter
  let showCompletedTasks = document.getElementById("showCompletedTasks");
  showCompletedTasks.textContent = completedTasks.length + " completed";

  console.log("Uncompleted tasks:", tasks);
  console.log("Completed tasks:", completedTasks);
}



function removeTask(taskText) {
tasks = tasks.filter(t => t !== taskText);
completedTasks = completedTasks.filter(t => t !== taskText);

let showCompletedTasks = document.getElementById("showCompletedTasks");
showCompletedTasks.textContent = completedTasks.length + " completed";

//Code for removing a task, not currently used
  console.log("Task removed:", taskText);
  console.log("Uncompleted tasks:", tasks);
  console.log("Completed tasks:", completedTasks);
}