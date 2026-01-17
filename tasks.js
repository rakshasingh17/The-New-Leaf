const taskList = document.getElementById("task-list");
const addTaskBtn = document.getElementById("add-task-btn");
const modal = document.getElementById("task-modal");
const modalTitle = document.getElementById("modal-title");
const saveTaskBtn = document.getElementById("save-task-btn");
const cancelTaskBtn = document.getElementById("cancel-task-btn");
const searchInput = document.getElementById("searchInput");
const filterBtns = document.querySelectorAll(".filter-btn");

const titleInput = document.getElementById("task-title");
const subjectInput = document.getElementById("task-subject");
const dueInput = document.getElementById("task-due");
const statusSelect = document.getElementById("task-status");

let tasks = [
  { id: 1, title: "Math Assignment", subject: "Calculus", due: "2026-01-20", status: "pending" },
  { id: 2, title: "Physics Lab", subject: "Mechanics", due: "2026-01-18", status: "completed" },
  { id: 3, title: "CS Project", subject: "Frontend UI", due: "2026-01-21", status: "pending" }
];

let editingId = null;
let currentFilter = "all";

/* ======================
   Render
   ====================== */
function renderTasks() {
  taskList.innerHTML = "";

  const searchText = searchInput.value.toLowerCase();

  const filteredTasks = tasks.filter(task => {
    const matchesFilter =
      currentFilter === "all" || task.status === currentFilter;

    const matchesSearch =
      task.title.toLowerCase().includes(searchText) ||
      task.subject.toLowerCase().includes(searchText);

    return matchesFilter && matchesSearch;
  });

  filteredTasks.forEach(task => {
    const card = document.createElement("div");
    card.className = `task-card ${task.status === "completed" ? "completed" : ""}`;

    card.innerHTML = `
      <h3>${task.title}</h3>
      <p>${task.subject} • Due: ${task.due}</p>
      <span class="status ${task.status}">${capitalize(task.status)}</span>

      <div class="card-actions">
        <button class="complete-btn">${task.status === "pending" ? "Mark Done" : "Undo"}</button>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      </div>
    `;

    // Complete toggle
    card.querySelector(".complete-btn").addEventListener("click", () => {
      task.status = task.status === "pending" ? "completed" : "pending";
      renderTasks();
    });

    // Edit
    card.querySelector(".edit-btn").addEventListener("click", () => {
      openEditModal(task);
    });

    // Delete
    card.querySelector(".delete-btn").addEventListener("click", () => {
      tasks = tasks.filter(t => t.id !== task.id);
      renderTasks();
    });

    taskList.appendChild(card);
  });
}

/* ======================
   Modal Logic
   ====================== */
addTaskBtn.addEventListener("click", () => {
  editingId = null;
  modalTitle.textContent = "Add Task";
  clearModal();
  modal.style.display = "flex";
});

cancelTaskBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

saveTaskBtn.addEventListener("click", () => {
  const title = titleInput.value.trim();
  const subject = subjectInput.value.trim();
  const due = dueInput.value;
  const status = statusSelect.value;

  if (!title || !subject || !due) {
    alert("Please fill all fields");
    return;
  }

  if (editingId) {
    const task = tasks.find(t => t.id === editingId);
    task.title = title;
    task.subject = subject;
    task.due = due;
    task.status = status;
  } else {
    tasks.push({
      id: Date.now(),
      title,
      subject,
      due,
      status
    });
  }

  modal.style.display = "none";
  renderTasks();
});

function openEditModal(task) {
  editingId = task.id;
  modalTitle.textContent = "Edit Task";
  titleInput.value = task.title;
  subjectInput.value = task.subject;
  dueInput.value = task.due;
  statusSelect.value = task.status;
  modal.style.display = "flex";
}

function clearModal() {
  titleInput.value = "";
  subjectInput.value = "";
  dueInput.value = "";
  statusSelect.value = "pending";
}

/* ======================
   Filters
   ====================== */
filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    renderTasks();
  });
});

/* ======================
   Search
   ====================== */
searchInput.addEventListener("input", renderTasks);

/* ======================
   Utils
   ====================== */
function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

/* Init */
renderTasks();
