const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const TOKEN = process.env.BOT_TOKEN;

app.get("/", (req, res) => {
    res.send("Bot running");
});

app.post("/webhook", async (req, res) => {
    try {
        const update = req.body;

        if (!TOKEN) {
            console.log("TOKEN missing");
            return res.send("no token");
        }

        if (update.message) {
            const chat_id = update.message.chat.id;
            const text = update.message.text;
            const name = update.message.from.first_name;

            if (text === "/start") {
                await axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
                    chat_id,
                    text: `👋 Welcome ${name}!`,
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
    console.log("Bot running on", PORT);
});
