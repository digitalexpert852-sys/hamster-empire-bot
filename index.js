const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const TOKEN = process.env.BOT_TOKEN;

app.post("/webhook", async (req, res) => {
    const update = req.body;

    if (update.message) {
        const chat_id = update.message.chat.id;
        const text = update.message.text;
        const name = update.message.from.first_name;

        if (text === "/start") {
            const message = `👋 Welcome ${name}!\n🐹 Hamster Empire Game`;

            const url = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

            await axios.post(url, {
                chat_id: chat_id,
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
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("Bot running"));
