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
  // limited input to 30 characters in html #QA-skills

  

  // Create a single error message if empty input    
  if (!taskText) {
    let existingError = document.querySelector(".error-message");
    if (!existingError){ 
    const messageBox = document.querySelector("ul"); 
    const errorMessage = document.createElement("span"); 

    errorMessage.className = "error-message";
    messageBox.appendChild(errorMessage); 
    
    errorMessage.innerText = " *Please enter a task"; 
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
  li.appendChild(checkbox);
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
  if (e.target.classList.contains("checkbox")) {
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

// Toggle checkbox - gjord enklare så allt håller sig i rätt arrays
function toggleBox(el) {
  const li = el.parentElement;
  const textLabel = li.querySelector(".text-label");
  const taskText = textLabel.textContent;

  if (el.textContent.trim() === "check_box_outline_blank") {
    // Mark as completed
    el.textContent = "check_box";
    textLabel.style.textDecoration = "line-through";

    // Remove from uncompleted if somewhere already
    tasks = tasks.filter(t => t !== taskText);

    // Add to completed if not already there
    if (!completedTasks.includes(taskText)) {
      completedTasks.push(taskText);
    }

    console.log("Marked as completed:", taskText);
  } else {
    // Mark as uncompleted
    el.textContent = "check_box_outline_blank";
    textLabel.style.textDecoration = "none";

    // Remove from completed if it exists
    completedTasks = completedTasks.filter(t => t !== taskText);

    // Add back to uncompleted if not already there
    if (!tasks.includes(taskText)) {
      tasks.push(taskText);
    }

    console.log("Marked as uncompleted:", taskText);
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