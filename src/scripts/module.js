import { getVideoIdFromMessage, getImgTagByVideoId } from "./lib/index.js";

Hooks.once("init", async function () {});

Hooks.once("ready", async function () {});

Hooks.on("renderChatMessage", (message, html, data) => {
  const { videoId, videoUrl } = getVideoIdFromMessage(data.message.content);
  if (videoId) {
    const imgTag = getImgTagByVideoId(videoId);
    html.find(".message-content").html(`${imgTag} ${data.message.content}`);
    html.find(".youtube-preview").on("click", (event) => {
      window.open(videoUrl);
    });
  }
});
