import React from "react";

const BackgroundVideo = () => {
  return (
    <div className="relative lg:h-scree w-full py-10">
      {/* Embed Streamable Video */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          paddingBottom: "52.854%",
        }}
      >
        <iframe
          allow="fullscreen; autoplay"
          allowFullScreen
          height="100%"
          src="https://streamable.com/e/7uu58y?autoplay=1&muted=1&nocontrols=1"
          width="100%"
          style={{
            border: "none",
            width: "100%",
            height: "100%",
            position: "absolute",
            left: "0px",
            top: "0px",
            overflow: "hidden",
            pointerEvents: "none", // Disable all user interactions with the video
          }}
        ></iframe>
      </div>

      {/* Content on top of the video */}
    </div>
  );
};

export default BackgroundVideo;
