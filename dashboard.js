// ---------- TASKS ----------
const addTaskBtn = document.getElementById("add-task-btn");
const taskForm = document.getElementById("task-form");
const saveTaskBtn = document.getElementById("save-task-btn");
const cancelTaskBtn = document.getElementById("cancel-task-btn");
const taskList = document.getElementById("task-list"); // Make sure this exists in HTML

// Show form
addTaskBtn.addEventListener("click", () => taskForm.style.display = "block");

// Cancel form
cancelTaskBtn.addEventListener("click", () => {
  taskForm.style.display = "none";
  clearTaskForm();
});

// Save task
saveTaskBtn.addEventListener("click", () => {
  const title = document.getElementById("task-title").value;
  const subject = document.getElementById("task-subject").value;
  const due = document.getElementById("task-due").value;
  const status = document.getElementById("task-status").value;

  if (!title || !subject || !due) return alert("Please fill all fields!");

  const newTask = document.createElement("div");
  newTask.classList.add("task-card");
  newTask.innerHTML = `
    <h3>${title}</h3>
    <p>${subject} - Due: ${due}</p>
    <span class="status ${status.toLowerCase()}">${status}</span>
    <button class="delete-btn">Delete</button>
  `;

  taskList.appendChild(newTask);
  taskForm.style.display = "none";
  clearTaskForm();
});

// Delete task
taskList.addEventListener("click", e => {
  if (e.target.classList.contains("delete-btn")) e.target.parentElement.remove();
});

function clearTaskForm() {
  document.getElementById("task-title").value = "";
  document.getElementById("task-subject").value = "";
  document.getElementById("task-due").value = "";
  document.getElementById("task-status").value = "Pending";
}

// ---------- DEADLINES ----------
const addDeadlineBtn = document.getElementById("add-deadline-btn");
const deadlineForm = document.getElementById("deadline-form");
const saveDeadlineBtn = document.getElementById("save-deadline-btn");
const cancelDeadlineBtn = document.getElementById("cancel-deadline-btn");
const deadlineList = document.getElementById("deadline-list"); // Make sure this exists

addDeadlineBtn.addEventListener("click", () => deadlineForm.style.display = "block");
cancelDeadlineBtn.addEventListener("click", () => {
  deadlineForm.style.display = "none";
  clearDeadlineForm();
});

saveDeadlineBtn.addEventListener("click", () => {
  const title = document.getElementById("deadline-title").value;
  const due = document.getElementById("deadline-due").value;

  if (!title || !due) return alert("Please fill all fields!");

  const newDeadline = document.createElement("div");
  newDeadline.classList.add("deadline-card");
  newDeadline.innerHTML = `
    <h3>${title}</h3>
    <p>Due: ${due}</p>
    <button class="delete-btn">Delete</button>
  `;

  deadlineList.appendChild(newDeadline);
  deadlineForm.style.display = "none";
  clearDeadlineForm();
});

deadlineList.addEventListener("click", e => {
  if (e.target.classList.contains("delete-btn")) e.target.parentElement.remove();
});

function clearDeadlineForm() {
  document.getElementById("deadline-title").value = "";
  document.getElementById("deadline-due").value = "";
}
