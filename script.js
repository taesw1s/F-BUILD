/* =========================
   О КОМПАНИИ
========================= */

const openAbout = document.getElementById("openAbout");
const closeAbout = document.getElementById("closeAbout");
const aboutModal = document.getElementById("aboutModal");

openAbout.addEventListener("click", function (event) {
    event.preventDefault();
    aboutModal.classList.add("active");
});

closeAbout.addEventListener("click", function () {
    aboutModal.classList.remove("active");
});


/* =========================
   ДОСТАВКА
========================= */

const openDelivery = document.getElementById("openDelivery");
const closeDelivery = document.getElementById("closeDelivery");
const deliveryModal = document.getElementById("deliveryModal");

openDelivery.addEventListener("click", function (event) {
    event.preventDefault();
    deliveryModal.classList.add("active");
});

closeDelivery.addEventListener("click", function () {
    deliveryModal.classList.remove("active");
});


/* =========================
   ОБЫЧНАЯ ЗАЯВКА
========================= */

const openContact = document.getElementById("openContact");
const closeContact = document.getElementById("closeContact");
const contactModal = document.getElementById("contactModal");

const contactForm = document.getElementById("contactForm");
const phoneInput = document.getElementById("phone");
const formMessage = document.getElementById("formMessage");

openContact.addEventListener("click", function () {
    contactModal.classList.add("active");
});

closeContact.addEventListener("click", function () {
    contactModal.classList.remove("active");
});

contactForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const phone = phoneInput.value.trim();

    if (!phone) {
        formMessage.textContent = "Введите номер телефона.";
        return;
    }

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
                data.message || "Не удалось отправить заявку.";

        }

    } catch (error) {

        console.error(error);

        formMessage.textContent =
            "Ошибка соединения с сервером.";

    }

});


/* =========================
   КАТАЛОГ
========================= */

const catalogModal = document.getElementById("catalogModal");
const closeCatalog = document.getElementById("closeCatalog");

const catalogTitle = document.getElementById("catalogTitle");
const catalogDescription = document.getElementById("catalogDescription");
const productsGrid = document.getElementById("productsGrid");


/* =========================
   ОКНО ТОВАРА
========================= */

const productModal = document.getElementById("productModal");
const closeProduct = document.getElementById("closeProduct");

const productCategory = document.getElementById("productCategory");
const productTitle = document.getElementById("productTitle");
const productDescription = document.getElementById("productDescription");
const productPrice = document.getElementById("productPrice");
const productOrder = document.getElementById("productOrder");


/* =========================
   ОКНО ЗАКАЗА
========================= */

const orderModal = document.getElementById("orderModal");
const closeOrder = document.getElementById("closeOrder");

const orderProduct = document.getElementById("orderProduct");
const orderPrice = document.getElementById("orderPrice");
const orderQuantity = document.getElementById("orderQuantity");
const orderUnit = document.getElementById("orderUnit");
const orderTotal = document.getElementById("orderTotal");

const orderPhone = document.getElementById("orderPhone");
const orderComment = document.getElementById("orderComment");

const orderForm = document.getElementById("orderForm");
const orderMessage = document.getElementById("orderMessage");


/* =========================
   ТОВАРЫ
========================= */

const catalogData = {

    brick: {
        title: "Кирпич и блоки",
        description: "Материалы для стен, перегородок и строительства.",
        products: [
            {
                name: "Газобетон D500",
                description: "Стеновой газобетонный блок 600×300×200 мм.",
                price: 7500,
                unit: "м³"
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
                price: 6500,
                unit: "м³"
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
                price: 65000,
                unit: "тонна"
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
                price: 25000,
                unit: "м³"
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
                price: 700,
                unit: "м²"
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
                price: 1200,
                unit: "упаковка"
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
                price: 450,
                unit: "мешок"
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
                price: 2500,
                unit: "тонна"
            }
        ]
    }

};


/* =========================
   ФОРМАТИРОВАНИЕ ЦЕНЫ
========================= */

function formatPrice(price) {
    return new Intl.NumberFormat("ru-RU").format(price) + " ₽";
}


/* =========================
   ОТКРЫТИЕ КАТЕГОРИИ
========================= */

document.querySelectorAll(".catalog-card").forEach(function (card) {

    card.addEventListener("click", function () {

        const category = card.dataset.category;
        const data = catalogData[category];

        if (!data) return;

        catalogTitle.textContent = data.title;
        catalogDescription.textContent = data.description;

        productsGrid.innerHTML = "";

        data.products.forEach(function (product) {

            const productCard = document.createElement("div");

            productCard.className = "product-card";

            productCard.innerHTML = `
                <div class="product-card-image">
                    ФОТО ТОВАРА
                </div>

                <h3>${product.name}</h3>

                <p>${product.description}</p>

                <div class="product-card-price">
                    от ${formatPrice(product.price)} / ${product.unit}
                </div>
            `;

            productCard.addEventListener("click", function () {

                productCategory.textContent = data.title;
                productTitle.textContent = product.name;
                productDescription.textContent = product.description;

                productPrice.textContent =
                    "от " + formatPrice(product.price) +
                    " / " + product.unit;

                productModal.dataset.productName = product.name;
                productModal.dataset.productPrice = product.price;
                productModal.dataset.productUnit = product.unit;

                productModal.classList.add("active");

            });

            productsGrid.appendChild(productCard);

        });

        catalogModal.classList.add("active");

    });

});


/* =========================
   ЗАКРЫТИЕ КАТАЛОГА
========================= */

closeCatalog.addEventListener("click", function () {
    catalogModal.classList.remove("active");
});


/* =========================
   ЗАКРЫТИЕ ТОВАРА
========================= */

closeProduct.addEventListener("click", function () {
    productModal.classList.remove("active");
});


/* =========================
   ПОЛУЧИТЬ РАСЧЁТ
========================= */

productOrder.addEventListener("click", function () {

    const productName = productModal.dataset.productName;
    const price = Number(productModal.dataset.productPrice);
    const unit = productModal.dataset.productUnit;

    orderProduct.textContent = productName;
    orderPrice.textContent =
        formatPrice(price) + " / " + unit;

    orderQuantity.value = 1;
    orderUnit.textContent = unit;

    updateTotal();

    productModal.classList.remove("active");
    catalogModal.classList.remove("active");

    orderModal.classList.add("active");

});


/* =========================
   РАСЧЁТ СУММЫ
========================= */

function updateTotal() {

    const price = Number(productModal.dataset.productPrice);
    const quantity = Number(orderQuantity.value);

    if (!quantity || quantity < 1) {
        orderTotal.textContent = "0 ₽";
        return;
    }

    const total = price * quantity;

    orderTotal.textContent = formatPrice(total);

}

orderQuantity.addEventListener("input", updateTotal);


/* =========================
   ОТПРАВКА ЗАКАЗА
========================= */

orderForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const product = productModal.dataset.productName;
    const price = Number(productModal.dataset.productPrice);
    const unit = productModal.dataset.productUnit;

    const quantity = Number(orderQuantity.value);
    const phone = orderPhone.value.trim();
    const comment = orderComment.value.trim();

    if (!quantity || quantity < 1) {
        orderMessage.textContent = "Укажите количество.";
        return;
    }

    if (!phone) {
        orderMessage.textContent = "Введите номер телефона.";
        return;
    }

    const total = price * quantity;

    orderMessage.textContent = "Отправляем заявку...";

    try {

        const response = await fetch("/api/order", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                product,
                price,
                unit,
                quantity,
                total,
                phone,
                comment
            })

        });

        const data = await response.json();

        if (data.success) {

            orderMessage.textContent =
                "Заявка отправлена! Мы свяжемся с вами.";

            orderForm.reset();

            orderQuantity.value = 1;

            setTimeout(function () {
                orderModal.classList.remove("active");
                orderMessage.textContent = "";
            }, 1800);

        } else {

            orderMessage.textContent =
                data.message || "Не удалось отправить заявку.";

        }

    } catch (error) {

        console.error(error);

        orderMessage.textContent =
            "Ошибка соединения с сервером.";

    }

});


/* =========================
   ЗАКРЫТИЕ ЗАКАЗА
========================= */

closeOrder.addEventListener("click", function () {
    orderModal.classList.remove("active");
});


/* =========================
   ЗАКРЫТИЕ ПО ФОНУ
========================= */

catalogModal.addEventListener("click", function (event) {

    if (event.target === catalogModal) {
        catalogModal.classList.remove("active");
    }

});

productModal.addEventListener("click", function (event) {

    if (event.target === productModal) {
        productModal.classList.remove("active");
    }

});

orderModal.addEventListener("click", function (event) {

    if (event.target === orderModal) {
        orderModal.classList.remove("active");
    }

})
