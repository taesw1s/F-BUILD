const openAbout = document.getElementById("openAbout");
const closeAbout = document.getElementById("closeAbout");
const aboutModal = document.getElementById("aboutModal");

openAbout.addEventListener("click", function() {
    aboutModal.classList.add("active");
});

closeAbout.addEventListener("click", function() {
    aboutModal.classList.remove("active");
});

const openDelivery = document.getElementById("openDelivery");
const closeDelivery = document.getElementById("closeDelivery");
const deliveryModal = document.getElementById("deliveryModal");

openDelivery.addEventListener("click", function() {
    deliveryModal.classList.add("active");
});

closeDelivery.addEventListener("click", function() {
    deliveryModal.classList.remove("active");
});



const openContact = document.getElementById("openContact");
const closeContact = document.getElementById("closeContact");
const contactModal = document.getElementById("contactModal");

const contactForm = document.getElementById("contactForm");
const phoneInput = document.getElementById("phone");
const formMessage = document.getElementById("formMessage");


openContact.addEventListener("click", function() {
    contactModal.classList.add("active");
});


closeContact.addEventListener("click", function() {
    contactModal.classList.remove("active");
});


contactForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const phone = phoneInput.value;

    formMessage.textContent = "Отправляем заявку...";

    try {

        const response = await fetch("/api/contact", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                phone: phone
            })

        });

        const data = await response.json();

        if (data.success) {

            formMessage.textContent =
                "Заявка отправлена! Мы свяжемся с вами.";

            contactForm.reset();

        } else {

            formMessage.textContent =
                "Не удалось отправить заявку.";

        }

    } catch (error) {

        console.error(error);

        formMessage.textContent =
            "Ошибка соединения с сервером.";

    }

});
