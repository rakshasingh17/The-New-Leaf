const calendarGrid = document.getElementById("calendar-grid");
const monthYear = document.getElementById("month-year");
const prevBtn = document.getElementById("prev-month");
const nextBtn = document.getElementById("next-month");

const selectedDateTitle = document.getElementById("selected-date-title");
const eventList = document.getElementById("event-list");
const addEventBtn = document.getElementById("add-event-btn");

const modal = document.getElementById("event-modal");
const saveEventBtn = document.getElementById("save-event-btn");
const cancelEventBtn = document.getElementById("cancel-event-btn");
const eventTitleInput = document.getElementById("event-title");
const eventTimeInput = document.getElementById("event-time");

let currentDate = new Date();
let selectedDate = null;

// Stores events by date string: "YYYY-MM-DD"
let events = {
  "2026-01-20": [
    { title: "Math Test", time: "10:00" },
    { title: "Group Meeting", time: "16:00" }
  ],
  "2026-01-23": [
    { title: "Physics Lab", time: "14:00" }
  ]
};

/* ======================
   Calendar Render
   ====================== */
function renderCalendar() {
  calendarGrid.innerHTML = "";

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  monthYear.textContent = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric"
  });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  // Previous month trailing days
  for (let i = firstDay - 1; i >= 0; i--) {
    const day = document.createElement("div");
    day.className = "day other-month";
    day.innerHTML = `<div class="date-number">${daysInPrevMonth - i}</div>`;
    calendarGrid.appendChild(day);
  }

  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    const day = document.createElement("div");
    day.className = "day";

    const dateStr = formatDate(year, month + 1, d);

    if (isToday(year, month, d)) day.classList.add("today");
    if (selectedDate === dateStr) day.classList.add("selected");

    day.innerHTML = `<div class="date-number">${d}</div>`;

    if (events[dateStr] && events[dateStr].length > 0) {
      const dot = document.createElement("div");
      dot.className = "event-dot";
      day.appendChild(dot);
    }

    day.addEventListener("click", () => {
      selectDate(dateStr);
    });

    calendarGrid.appendChild(day);
  }
}

/* ======================
   Date Selection
   ====================== */
function selectDate(dateStr) {
  selectedDate = dateStr;
  renderCalendar();
  renderEvents();
}

/* ======================
   Events Panel
   ====================== */
function renderEvents() {
  if (!selectedDate) {
    selectedDateTitle.textContent = "Select a date";
    eventList.innerHTML = "";
    return;
  }

  const readable = new Date(selectedDate).toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  });

  selectedDateTitle.textContent = readable;
  eventList.innerHTML = "";

  const dayEvents = events[selectedDate] || [];

  if (dayEvents.length === 0) {
    eventList.innerHTML = `<p style="text-align:center;color:#718096;font-size:0.85rem;">No events yet</p>`;
    return;
  }

  dayEvents.forEach((event, index) => {
    const item = document.createElement("div");
    item.className = "event-item";

    item.innerHTML = `
      <span>${event.time ? event.time + " • " : ""}${event.title}</span>
      <button class="delete-event-btn">Delete</button>
    `;

    item.querySelector("button").addEventListener("click", () => {
      events[selectedDate].splice(index, 1);
      if (events[selectedDate].length === 0) delete events[selectedDate];
      renderCalendar();
      renderEvents();
    });

    eventList.appendChild(item);
  });
}

/* ======================
   Modal Logic
   ====================== */
addEventBtn.addEventListener("click", () => {
  if (!selectedDate) {
    alert("Please select a date first");
    return;
  }
  modal.style.display = "flex";
  eventTitleInput.value = "";
  eventTimeInput.value = "";
});

cancelEventBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

saveEventBtn.addEventListener("click", () => {
  const title = eventTitleInput.value.trim();
  const time = eventTimeInput.value;

  if (!title) {
    alert("Please enter an event title");
    return;
  }

  if (!events[selectedDate]) events[selectedDate] = [];
  events[selectedDate].push({ title, time });

  modal.style.display = "none";
  renderCalendar();
  renderEvents();
});

/* ======================
   Navigation
   ====================== */
prevBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});

nextBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});

/* ======================
   Helpers
   ====================== */
function formatDate(y, m, d) {
  return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

function isToday(y, m, d) {
  const today = new Date();
  return (
    y === today.getFullYear() &&
    m === today.getMonth() &&
    d === today.getDate()
  );
}

/* Init */
renderCalendar();
