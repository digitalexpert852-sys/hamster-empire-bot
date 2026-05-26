<?php

$token = "8688084678:AAHb9YZ848_vYOp2St4bdIzcyo8KDBsotcA";

// Telegram থেকে data নেওয়া
$update = json_decode(file_get_contents("php://input"), true);

// যদি message থাকে
if(isset($update["message"])){

    $chat_id = $update["message"]["chat"]["id"];
    $text = $update["message"]["text"];
    $name = $update["message"]["from"]["first_name"];

    // /start command
    if($text == "/start"){

        $msg = "👋 Welcome $name!\n\n🐹 Welcome to Hamster Empire\n💰 Play & Earn Coins\n\n👇 Click below to start";

        $keyboard = [
            "inline_keyboard" => [
                [
                    [
                        "text" => "🎮 Play Game",
                        "web_app" => [
                            "url" => "https://hamsterempire.kesug.com/"
                        ]
                    ]
                ]
            ]
        ];

        // message send
        file_get_contents("https://api.telegram.org/bot$token/sendMessage?" . http_build_query([
            "chat_id" => $chat_id,
            "text" => $msg,
            "reply_markup" => json_encode($keyboard)
        ]));
    }
}

?>
