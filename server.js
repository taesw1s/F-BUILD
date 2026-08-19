const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.static("."));

const PORT = 3000;

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
            `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    chat_id: process.env.CHAT_ID,
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


app.listen(PORT, () => {
    console.log(`F-BUILD запущен: http://localhost:${PORT}`);
});
