const nameInput = document.getElementById("name-input");
const saveNameBtn = document.getElementById("save-name-btn");
const savedNameText = document.getElementById("saved-name-text");

const darkToggle = document.getElementById("dark-toggle");
const themeSelect = document.getElementById("theme-select");
const resetBtn = document.getElementById("reset-btn");

/* ======================
   Load saved settings
   ====================== */
const savedName = localStorage.getItem("name");
const savedDark = localStorage.getItem("darkMode");
const savedTheme = localStorage.getItem("theme");

if (savedName) {
  nameInput.value = savedName;
  savedNameText.textContent = `Saved name: ${savedName}`;
}

if (savedDark === "true") {
  darkToggle.checked = true;
  document.documentElement.classList.add("dark");
}

if (savedTheme) {
  setTheme(savedTheme);
  themeSelect.value = savedTheme;
}

/* ======================
   Name
   ====================== */
saveNameBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  if (!name) return alert("Enter a name!");
  localStorage.setItem("name", name);
  savedNameText.textContent = `Saved name: ${name}`;
});

/* ======================
   Dark mode
   ====================== */
darkToggle.addEventListener("change", () => {
  if (darkToggle.checked) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("darkMode", "true");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("darkMode", "false");
  }
});

/* ======================
   Theme colors
   ====================== */
themeSelect.addEventListener("change", () => {
  setTheme(themeSelect.value);
  localStorage.setItem("theme", themeSelect.value);
});

function setTheme(theme) {
  let color = "#2f855a";
  if (theme === "lavender") color = "#805ad5";
  if (theme === "sky") color = "#3182ce";
  if (theme === "peach") color = "#dd6b20";

  document.documentElement.style.setProperty("--accent", color);
}

/* ======================
   Reset
   ====================== */
resetBtn.addEventListener("click", () => {
  const ok = confirm("This will erase all your data. Continue?");
  if (!ok) return;

  localStorage.clear();
  location.reload();
});
