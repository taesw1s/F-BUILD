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


const catalogModal = document.getElementById("catalogModal");
const closeCatalog = document.getElementById("closeCatalog");

const productModal = document.getElementById("productModal");
const closeProduct = document.getElementById("closeProduct");

const catalogTitle = document.getElementById("catalogTitle");
const catalogDescription = document.getElementById("catalogDescription");
const productsGrid = document.getElementById("productsGrid");

const productCategory = document.getElementById("productCategory");
const productTitle = document.getElementById("productTitle");
const productDescription = document.getElementById("productDescription");
const productPrice = document.getElementById("productPrice");
const productOrder = document.getElementById("productOrder");


const catalogData = {

    brick: {
        title: "Кирпич и блоки",
        description: "Материалы для стен, перегородок и строительства.",
        products: [
            {
                name: "Газобетон D500",
                description: "Стеновой газобетонный блок 600×300×200 мм.",
                price: "от 7 500 ₽ / м³"
            }
        ]
    },

    concrete: {
        title: "Бетон и ЖБИ",
        description: "Бетонные смеси и железобетонные изделия.",
        products: [
            {
                name: "Бетон М300",
                description: "Готовая бетонная смесь для строительных работ.",
                price: "от 6 500 ₽ / м³"
            }
        ]
    },

    metal: {
        title: "Арматура и металл",
        description: "Металлопрокат для строительства.",
        products: [
            {
                name: "Арматура А500С",
                description: "Стальная арматура для железобетонных конструкций.",
                price: "от 65 000 ₽ / тонна"
            }
        ]
    },

    wood: {
        title: "Пиломатериалы",
        description: "Древесина для строительных работ.",
        products: [
            {
                name: "Доска обрезная",
                description: "Строительная доска хвойных пород.",
                price: "от 25 000 ₽ / м³"
            }
        ]
    },

    roof: {
        title: "Кровля",
        description: "Материалы для кровельных систем.",
        products: [
            {
                name: "Металлочерепица",
                description: "Профилированный кровельный материал.",
                price: "от 700 ₽ / м²"
            }
        ]
    },

    insulation: {
        title: "Утеплители",
        description: "Теплоизоляционные материалы.",
        products: [
            {
                name: "Минеральная вата",
                description: "Теплоизоляционный материал для стен и кровли.",
                price: "от 1 200 ₽ / упаковка"
            }
        ]
    },

    mixes: {
        title: "Сухие смеси",
        description: "Цемент, растворы и строительные смеси.",
        products: [
            {
                name: "Цемент М500",
                description: "Портландцемент для строительных работ.",
                price: "от 450 ₽ / мешок"
            }
        ]
    },

    bulk: {
        title: "Сыпучие материалы",
        description: "Песок, щебень и другие материалы.",
        products: [
            {
                name: "Щебень гранитный",
                description: "Фракция 5–20 мм для строительных работ.",
                price: "от 2 500 ₽ / тонна"
            }
        ]
    }

};


/* Открытие категории */

document.querySelectorAll(".catalog-card").forEach(function(card) {

    card.addEventListener("click", function() {

        const category = card.dataset.category;
        const data = catalogData[category];

        catalogTitle.textContent = data.title;
        catalogDescription.textContent = data.description;

        productsGrid.innerHTML = "";

        data.products.forEach(function(product, index) {

            const productCard = document.createElement("div");

            productCard.className = "product-card";

            productCard.innerHTML = `
                <div class="product-card-image">
                    ФОТО ТОВАРА
                </div>

                <h3>${product.name}</h3>

                <p>${product.description}</p>

                <div class="product-card-price">
                    ${product.price}
                </div>
            `;

            productCard.addEventListener("click", function() {

                productCategory.textContent = data.title;
                productTitle.textContent = product.name;
                productDescription.textContent = product.description;
                productPrice.textContent = product.price;

                productModal.classList.add("active");

            });

            productsGrid.appendChild(productCard);

        });

        catalogModal.classList.add("active");

    });

});


/* Закрытие каталога */

closeCatalog.addEventListener("click", function() {
    catalogModal.classList.remove("active");
});


/* Закрытие товара */

closeProduct.addEventListener("click", function() {
    productModal.classList.remove("active");
});


/* Получить расчёт */

productOrder.addEventListener("click", function() {

    productModal.classList.remove("active");
    catalogModal.classList.remove("active");

    contactModal.classList.add("active");

});


/* Закрытие по фону */

catalogModal.addEventListener("click", function(event) {

    if (event.target === catalogModal) {
        catalogModal.classList.remove("active");
    }

});


productModal.addEventListener("click", function(event) {

    if (event.target === productModal) {
        productModal.classList.remove("active");
    }

});
