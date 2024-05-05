/*

		Auto Resume Button 

		Made by pflip :  https://t.me/pflip97
		
		A litte button for WDB to enable/disable the AutoResume
		Useful for frequent disconnection, casino timeouts, etc
		
		Usage :
		
		- Past this code in the browser console and hit "Return"
		- Enable / Disable with left click
		- Destroy with right click
		- Drag the button around with left click
		- Default check every 10 seconds

*/

// Function to clean up and remove button
function removeButton() {
  clearInterval(interval); // Clear any active timeouts
  button.removeEventListener("click", toggleButton); // Remove click event listener
  document.body.removeChild(button); // Remove button from the DOM
}

// Function to handle mouse right-click event
function handleRightClick(event) {
  event.preventDefault(); // Prevent default right-click behavior (context menu)
  removeButton(); // Remove the button and clear timeouts
}

// Create button element
const button = document.createElement("button");
button.innerHTML = "<span>AutoResume</span><br><span>(Disabled)</span>"; // Label and initial state
button.classList.add("rounded-button");
button.style.backgroundColor = "#FF5733"; // Set background color to red (disabled state)
button.style.color = "black"; // Set text color
button.style.position = "absolute";
button.style.zIndex = "9999";
button.style.cursor = "move"; // Make the button draggable
button.style.width = "160px"; // Set width
button.style.height = "80px"; // Set height
button.style.fontSize = "16px"; // Set font size
button.style.padding = "10px"; // Add padding
button.style.borderRadius = "20px"; // Set border radius for rounded corners

// Set id and name
button.id = "toggleButton";
button.name = "toggleButton";

// Function to set initial position of the button to the right of the div
function setInitialPosition() {
  const targetDiv = document.getElementById("wdb");
  const divRect = targetDiv.getBoundingClientRect();

  button.style.left = divRect.right + 20 + "px"; // Adjust as needed
  button.style.top =
    divRect.top + (divRect.height - button.offsetHeight) / 2 + "px"; // Center vertically
}

// Call the function to set initial position
setInitialPosition();

let isDragging = false;
let offsetX, offsetY;

// Function to handle mouse move event
function handleMouseMove(event) {
  if (isDragging) {
    const newX = event.clientX - offsetX;
    const newY = event.clientY - offsetY;
    button.style.left = newX + "px";
    button.style.top = newY + "px";
  }
}

// Function to handle mouse down event
function handleMouseDown(event) {
  isDragging = true;
  offsetX = event.clientX - button.getBoundingClientRect().left;
  offsetY = event.clientY - button.getBoundingClientRect().top;
}

// Function to handle mouse up event
function handleMouseUp() {
  isDragging = false;
}

// Add event listeners for mouse events
document.addEventListener("mousemove", handleMouseMove);
document.addEventListener("mouseup", handleMouseUp);
button.addEventListener("mousedown", handleMouseDown);

// Function to be invoked when enabled
function check() {
  const resumeButton = document.querySelector("#wdbResumeButton");

  if (resumeButton) {
    console.log("Clicking resume button...");
    resumeButton.click();
  } else {
    console.log("Resume button not found.");
  }
}

// Toggle button text and invoke/remove function
button.addEventListener("click", function () {
  if (button.textContent.includes("(Enabled)")) {
    button.innerHTML = "<span>AutoResume</span><br><span>(Disabled)</span>"; // Change text and state
    button.style.backgroundColor = "#FF5733"; // Red color when disabled
    clearInterval(interval);
  } else {
    button.innerHTML = "<span>AutoResume</span><br><span>(Enabled)</span>"; // Change text and state
    button.style.backgroundColor = "#4CAF50"; // Green color when enabled
    interval = setInterval(check, 10000);
    check(); // Run immediately after enabling
  }
});

// Add event listener for right-click
button.addEventListener("contextmenu", handleRightClick);

// Append button to document body
document.body.appendChild(button);

let interval; // Define interval variable outside the scope of click event listener
