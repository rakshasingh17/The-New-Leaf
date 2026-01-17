const savedDark = localStorage.getItem("darkMode");
const savedTheme = localStorage.getItem("theme");
const savedName = localStorage.getItem("name");

if (savedDark === "true") {
  document.documentElement.classList.add("dark");
}

if (savedTheme) {
  setTheme(savedTheme);
}

function setTheme(theme) {
  let color = "#2f855a";
  if (theme === "lavender") color = "#805ad5";
  if (theme === "sky") color = "#3182ce";
  if (theme === "peach") color = "#dd6b20";
  document.documentElement.style.setProperty("--accent", color);
}
