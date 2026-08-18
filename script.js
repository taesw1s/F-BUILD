const openAbout = document.getElementById("openAbout");
const closeAbout = document.getElementById("closeAbout");
const aboutModal = document.getElementById("aboutModal");

openAbout.addEventListener("click", function() {
    aboutModal.classList.add("active");
});

closeAbout.addEventListener("click", function() {
    aboutModal.classList.remove("active");
});

