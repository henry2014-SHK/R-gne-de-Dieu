const menuToggle = document.getElementById("menu-toggle")
const mobileMenu = document.getElementById("mobile-menu")
const closeMenu = document.querySelector(".close-menu")
const body = document.body

function toggleMenu() {
  mobileMenu.classList.toggle("active")
  menuToggle.classList.toggle("open")
  body.style.overflow = mobileMenu.classList.contains("active") ? "hidden" : ""
}

function closeMenuOnResize() {
  if (window.innerWidth > 768) {
    mobileMenu.classList.remove("active")
    menuToggle.classList.remove("open")
    body.style.overflow = ""
  }
}

window.addEventListener("resize", closeMenuOnResize)
menuToggle.addEventListener("click", toggleMenu)
closeMenu.addEventListener("click", toggleMenu)

// Close menu when clicking outside
mobileMenu.addEventListener("click", (e) => {
  if (e.target === mobileMenu) {
    toggleMenu()
  }
})

function adjustHeight() {
  const accueil = document.getElementById("accueil")
  accueil.style.minHeight = window.innerHeight + "px"
}

window.addEventListener("resize", adjustHeight)
window.addEventListener("orientationchange", adjustHeight)
document.addEventListener("DOMContentLoaded", adjustHeight)

function adjustHeight() {
  const accueil = document.getElementById("accueil")
  accueil.style.minHeight = window.innerHeight + "px"
}

window.addEventListener("resize", adjustHeight)
window.addEventListener("orientationchange", adjustHeight)
document.addEventListener("DOMContentLoaded", adjustHeight)

