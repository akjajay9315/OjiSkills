import { CheckCircle2,XCircle } from "lucide-react";
import React from "react";
import { useState } from "react";

function FullVideoPlayer({ activeChapter }) {
  const [isDone, setIsDone] = useState(false);

  const handleButtonClick = () => {
    setIsDone(!isDone);
  };

  const videoUrl = activeChapter?.youtubeUrl;

  // Helper function to check if the URL is a YouTube URL
  const isYouTubeUrl =
    videoUrl &&
    (videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be"));

  // Helper function to get the YouTube embed URL
  const getYouTubeEmbedUrl = (url) => {
    const urlObj = new URL(url);
    const videoId = urlObj.searchParams.get("v") || url.split("/").pop();
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <div className="rounded-lg overflow-hidden relative p-4 mt-[2rem] w-[55rem] h-[40rem]">
      {videoUrl ? (
        isYouTubeUrl ? (
          <div className="relative pb-[56.25%] overflow-hidden rounded-lg mb-4">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={getYouTubeEmbedUrl(videoUrl)}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <div className="relative pb-[56.25%] overflow-hidden rounded-lg mb-4">
            <video
              className="absolute top-0 left-0 w-full h-full"
              src={videoUrl}
              type="video/mp4"
              controls
              controlsList="nodownload"
            ></video>
          </div>
        )
      ) : null}
      <div className="flex flex-col lg:flex-row justify-between items-center border-2 border-black p-4 rounded-lg">
        <h2 className="text-[22px] md:text-[18px] lg:text-[18px] font-medium mt-1">
          {activeChapter?.name}
        </h2>
        <button
          onClick={handleButtonClick}
          className="bg-green-500 border border-black text-white p-2 px-5 rounded-lg flex gap-2
        hover:bg-green-600 hover:border-green-600"
        >
          {isDone ? <XCircle /> : <CheckCircle2 />}
          <h2>{isDone ? "Mark as Undone" : "Mark as Done"}</h2>
        </button>
      </div>
    </div>
  );
}

export default FullVideoPlayer;
