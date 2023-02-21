Hooks.once("init", async function () {});

Hooks.once("ready", async function () {});

Hooks.on("renderChatLog", (log, html, data) => {
  // Find all chat messages with a YouTube video link
  const chatMessages = html.find(".chat-message .message-content");
  chatMessages.each((index, element) => {
    const message = $(element);
    const youtubeUrlRegex =
      /https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([A-Za-z0-9_-]{11})/;
    const match = message.html().match(youtubeUrlRegex);
    if (match) {
      // Extract the YouTube video ID from the URL
      const videoId = match[1];

      // Append the preview image to the chat message
      const previewImageUrl = `https://img.youtube.com/vi/${videoId}/sddefault.jpg`;
      const previewImageHtml = `<img class="youtube-preview" src="${previewImageUrl}" data-video-id="${videoId}"/>`;
      message.append(previewImageHtml);

      // Add a click event listener to the preview image
      message.find(`img[data-video-id="${videoId}"]`).on("click", (event) => {
        const videoId = event.currentTarget.getAttribute("data-video-id");

        // Open a dialog box to play the video
        const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
        const dialogHtml = `<iframe width="560" height="315" src="${videoUrl}" frameborder="0" allowfullscreen></iframe>`;
        new Dialog({
          title: `YouTube Video ${videoId}`,
          content: dialogHtml,
          buttons: {},
          default: "close",
        }).render(true);
      });

      // Add a hover event listener to the preview image
      message
        .find(`img[data-video-id="${videoId}"]`)
        .on("mouseenter", (event) => {
          $(event.currentTarget).addClass("youtube-preview-hover");
        });
      message
        .find(`img[data-video-id="${videoId}"]`)
        .on("mouseleave", (event) => {
          $(event.currentTarget).removeClass("youtube-preview-hover");
        });
    }
  });
});
