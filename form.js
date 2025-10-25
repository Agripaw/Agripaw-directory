// Handle dropdown toggle open/close
document.addEventListener("click", function (e) {
  const isDropdownButton = e.target.matches(".dropbtn");
  const dropdown = e.target.closest(".dropdown");

  if (isDropdownButton && dropdown) {
    dropdown.classList.toggle("open");
  } else {
    document.querySelectorAll(".dropdown.open").forEach((d) => d.classList.remove("open"));
  }
});
