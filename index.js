function Bot(BOT_TOKEN, BASE_URL) {
  async function sendMessage(chatId, message) {
    try {
      const api = `${BASE_URL}/bot${BOT_TOKEN}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(
        message
      )}`;

      const res = await fetch(api, {
        method: "GET",
      });

      if (res.ok) {
        return new Response("Message sent successfully!", { status: 200 });
      } else {
        return new Response(`Failed to send message: ${res.statusText}`, {
          status: res.status,
        });
      }
    } catch (err) {
      return new Response(
        `Error occurred while sending the message: ${err.message}`,
        {
          status: 500,
        }
      );
    }
  }

  async function getFile(chatId, fileId) {
    try {
      const api = `${BASE_URL}/bot${BOT_TOKEN}/getFile?file_id=${fileId}`;

      const res = await fetch(api, {
        method: "GET",
      });

      const json = await res.json();

      if (res.ok) {
        return await sendMessage(
          chatId,
          `${BASE_URL}file/bot${BOT_TOKEN}/${json.result.file_path}`
        );
      } else {
        return await sendMessage(
          chatId,
          `Error in getting the file: ${res.status}: ${res.statusText}`
        );
      }
    } catch (err) {
      return new Response(
        `Error occurred while getting the file: ${err.message}`,
        {
          status: 500,
        }
      );
    }
  }
  return [sendMessage, getFile];
}

module.exports = {
  async fetch(request, env, ctx) {
    const { method } = request;
    if (method == "POST") {
      const data = await request.json();
      const { message } = data;
      const BOT_TOKEN = String(env.TELEGRAM_BOT_TOKEN);
      const BASE_URL = String(env.TELEGRAM_BOT_SERVER_URL);
      const [sendMessage, getFile] = Bot(BOT_TOKEN, BASE_URL);
      if (message) {
        if (message.text) {
          const cmd = message.text.trim();
          if (cmd.startsWith("/start")) {
            const chatId = message.chat.id;
            return await sendMessage(chatId, "Hello");
          }
        } else if (message.video) {
          const chatId = message.chat.id;
          return await getFile(chatId, message.video.file_id);
        }
      }
    }
    return new Response("OK", { status: 200 });
  },
};
