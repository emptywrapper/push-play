/**
 * @param {String} messageContent The message content
 * @returns {Boolean | String} false or the the videoId
 */
export function getVideoIdFromMessage(messageContent) {
  const youtubeUrlRegex =
    /(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})(?:\S+)?(?=\"|'>)/;
  const videoUrlMatches = String(messageContent).match(youtubeUrlRegex);
  if (!videoUrlMatches) {
    return false;
  }

  return { videoUrl: videoUrlMatches[0], videoId: videoUrlMatches[1] };
}

export function getImgTagByVideoId(videoId) {
  return `<img class="youtube-preview" src="https://img.youtube.com/vi/${videoId}/sddefault.jpg" data-video-id="${videoId}" />`;
}
