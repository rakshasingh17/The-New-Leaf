let data = {
  subjects: [
    { name: "Mathematics", completed: 6, total: 10 },
    { name: "Physics", completed: 5, total: 9 },
    { name: "Computer Science", completed: 7, total: 12 },
    { name: "Electronics", completed: 4, total: 7 }
  ],
  grades: {
    Mathematics: 8.5,
    Physics: 7.8,
    "Computer Science": 9.2,
    Electronics: 7.5
  }
};

const overallPercent = document.getElementById("overall-percent");
const progressCircle = document.getElementById("progress-circle");
const overallText = document.getElementById("overall-text");
const completeTaskBtn = document.getElementById("complete-task-btn");
const subjectSelect = document.getElementById("subject-select");

const subjectList = document.getElementById("subject-list");
const subjectDetail = document.getElementById("subject-detail");

const gradesList = document.getElementById("grades-list");
const addGradeBtn = document.getElementById("add-grade-btn");
const gpaValue = document.getElementById("gpa-value");

/* ======================
   Helpers
   ====================== */
function calculateOverall() {
  const totalCompleted = data.subjects.reduce((s, sub) => s + sub.completed, 0);
  const totalTasks = data.subjects.reduce((s, sub) => s + sub.total, 0);
  return Math.round((totalCompleted / totalTasks) * 100);
}

function calculateGPA() {
  const grades = Object.values(data.grades);
  const avg = grades.reduce((s, g) => s + g, 0) / grades.length;
  return avg.toFixed(2);
}

/* ======================
   Overall
   ====================== */
function renderOverall() {
  const percent = calculateOverall();
  overallPercent.textContent = `${percent}%`;
  progressCircle.style.background = `conic-gradient(#2f855a ${percent * 3.6}deg, #e2e8f0 0deg)`;

  if (percent >= 85) overallText.textContent = "You're thriving. Keep it up.";
  else if (percent >= 60) overallText.textContent = "Strong momentum. Stay consistent.";
  else overallText.textContent = "Progress over perfection. Keep going.";
}

/* ======================
   Subjects
   ====================== */
function renderSubjects() {
  subjectList.innerHTML = "";
  subjectSelect.innerHTML = "";

  data.subjects.forEach((subject, index) => {
    const percent = Math.round((subject.completed / subject.total) * 100);

    const option = document.createElement("option");
    option.value = index;
    option.textContent = subject.name;
    subjectSelect.appendChild(option);

    const item = document.createElement("div");
    item.className = "subject-item";
    item.innerHTML = `
      <div class="subject-header">
        <span>${subject.name}</span>
        <span>${percent}%</span>
      </div>
      <div class="subject-bar">
        <div class="subject-fill" style="width:${percent}%"></div>
      </div>
    `;

    item.addEventListener("click", () => {
      subjectDetail.classList.remove("hidden");
      subjectDetail.innerHTML = `
        <strong>${subject.name}</strong><br>
        ${subject.completed} of ${subject.total} tasks completed<br>
        Remaining: ${subject.total - subject.completed}
      `;
    });

    subjectList.appendChild(item);
  });
}

/* ======================
   Grades
   ====================== */
function renderGrades() {
  gradesList.innerHTML = "";

  for (let subject in data.grades) {
    const row = document.createElement("div");
    row.className = "grade-row";
    row.innerHTML = `
      <div>${subject}</div>
      <span>${data.grades[subject]}</span>
    `;
    gradesList.appendChild(row);
  }

  gpaValue.textContent = calculateGPA();
}

/* ======================
   Interaction
   ====================== */
completeTaskBtn.addEventListener("click", () => {
  const index = subjectSelect.value;
  const subject = data.subjects[index];

  if (subject.completed >= subject.total) {
    alert("All tasks for this subject are already completed.");
    return;
  }

  subject.completed++;
  renderOverall();
  renderSubjects();
});

addGradeBtn.addEventListener("click", () => {
  const subject = prompt("Enter subject name:");
  if (!subject) return;

  const grade = prompt("Enter grade (0 - 10):");
  const numeric = parseFloat(grade);

  if (isNaN(numeric) || numeric < 0 || numeric > 10) {
    alert("Enter a valid grade between 0 and 10.");
    return;
  }

  data.grades[subject] = numeric;
  renderGrades();
});

/* Init */
renderOverall();
renderSubjects();
renderGrades();

