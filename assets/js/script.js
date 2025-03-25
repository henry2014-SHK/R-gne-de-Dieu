const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  menuToggle.classList.toggle('open');
});

function toggleDescription(button) {
  var description = button.nextElementSibling;
  if (description.style.display === "none") {
    description.style.display = "block";
  } else {
    description.style.display = "none";
  }
}
