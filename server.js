const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.static("."));

const PORT = process.env.PORT || 3000;

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

const SITE_URL = "https://f-build.onrender.com";
const WEBHOOK_URL = `${SITE_URL}/telegram-webhook`;


/* =========================
   ЗАЯВКИ С САЙТА
========================= */

app.post("/api/contact", async (req, res) => {

    const { phone } = req.body;

    if (!phone) {
        return res.status(400).json({
            success: false,
            message: "Введите номер телефона"
        });
    }

    const message = `
🏗️ НОВАЯ ЗАЯВКА F-BUILD

📞 Телефон: ${phone}
`;

    try {

        const response = await fetch(
            `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    text: message
                })
            }
        );

        const data = await response.json();

        if (!data.ok) {
            throw new Error("Telegram API error");
        }

        res.json({
            success: true
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Не удалось отправить заявку"
        });
    }
});


/* =========================
   TELEGRAM WEBHOOK
========================= */

app.post("/telegram-webhook", async (req, res) => {

    const update = req.body;

    // Сразу отвечаем Telegram
    res.sendStatus(200);

    if (!update.message) {
        return;
    }

    const chatId = update.message.chat.id;
    const text = update.message.text;

    // Команда /start
    if (text === "/start") {

        const welcomeMessage = `
🏗️ F-BUILD

Строительные материалы для частного, коммерческого и крупного строительства.

📋 Хотите получить консультацию или рассчитать заказ?

🌐 Оставьте заявку на нашем сайте:

${SITE_URL}

Мы свяжемся с вами и обсудим ваш проект.
`;

        try {

            await fetch(
                `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        chat_id: chatId,
                        text: welcomeMessage
                    })
                }
            );

        } catch (error) {

            console.error("Ошибка отправки сообщения бота:", error);

        }
    }

});


/* =========================
   УСТАНОВКА WEBHOOK
========================= */

async function setupWebhook() {

    try {

        const response = await fetch(
            `https://api.telegram.org/bot${BOT_TOKEN}/setWebhook?url=${WEBHOOK_URL}`
        );

        const data = await response.json();

        console.log("Telegram webhook:", data);

    } catch (error) {

        console.error("Ошибка установки webhook:", error);

    }
}


/* =========================
   ЗАПУСК СЕРВЕРА
========================= */

app.listen(PORT, async () => {

    console.log(`F-BUILD запущен на порту ${PORT}`);

    await setupWebhook();

});

