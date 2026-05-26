const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const TOKEN = process.env.BOT_TOKEN;

// 🔥 health check route (IMPORTANT)
app.get("/", (req, res) => {
    res.send("Bot is running");
});

app.post("/webhook", async (req, res) => {
    try {
        const update = req.body;

        if (!TOKEN) {
            console.log("BOT_TOKEN is missing!");
            return res.send("no token");
        }

        if (update.message) {
            const chat_id = update.message.chat.id;
            const text = update.message.text;
            const name = update.message.from.first_name;

            if (text === "/start") {
                const message = `👋 Welcome ${name}!\n🐹 Hamster Empire Game`;

                await axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
                    chat_id,
                    text: message,
                    reply_markup: {
                        inline_keyboard: [[
                            {
                                text: "🎮 Play Game",
                                web_app: {
                                    url: "https://hamsterempire.kesug.com/"
                                }
                            }
                        ]]
                    }
                });
            }
        }

        res.send("ok");

    } catch (err) {
        console.log("ERROR:", err.message);
        res.send("error");
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log("Bot running on port", PORT);
});
