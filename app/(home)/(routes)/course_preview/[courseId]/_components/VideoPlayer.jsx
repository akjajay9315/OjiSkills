import React from "react";

function VideoPlayer({ videoUrl }) {
  const isYouTubeUrl =
    videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be");

  const getYouTubeEmbedUrl = (url) => {
    const urlObj = new URL(url);
    const videoId = urlObj.searchParams.get("v") || url.split("/").pop();
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <div className="border-2 rounded-lg p-2">
      <h2 className="mb-3 text-gray-400">Course Preview</h2>
      {isYouTubeUrl ? (
        <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={getYouTubeEmbedUrl(videoUrl)}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg">
          <video
            className="absolute top-0 left-0 w-full h-full"
            controls
            controlsList="nodownload"
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        </div>
      )}
    </div>
  );
}

export default VideoPlayer;
