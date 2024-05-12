import { RefObject, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import {
  PlayerContext,
  PlayerDispatchContext,
} from "../../context/VideoContext";
import { MUTE_UNMUTE, SPEED, VIDEO_PROGRESS } from "../../context/VideoReducer";

export const StyledViedoToolbar = styled.div`
  align-items: center;
  justify-content: space-evenly;
  position: absolute;
  background: red;
  width: 100%;
  height: 100px;
  bottom: 0rem;
  background: linear-gradient(to top, transparent, white);
  color: black;
  visibility: hidden;
  transition: all 0.3s ease-in-out;
  input[type="range"] {
    -webkit-appearance: none !important;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 20px;
    height: 4px;
    width: 350px;
  }

  input[type="range"]::-moz-range-progress {
    background: red;
  }
`;
export type TvideoToolbar = {
  videoElement: RefObject<HTMLVideoElement>;
  onVideoClick: () => void;
  numFrames: number;
};

const VideoToolbar = ({
  videoElement,
  onVideoClick,
  numFrames,
}: TvideoToolbar) => {
  const { isPlaying, progress, speed, isMuted } = useContext(PlayerContext);
  const [tooltip, setTooltip] = useState(false);
  const [currentFrame, setCurrentFrame] = useState<number | null>(null); // State to track the current frame
  const [percentage, setPercentage] = useState<number | null>(null);
  const [thumbnails, setThumbnails] = useState<string[]>([]);

  const handleHover = (e) => {
    if (videoElement.current) {
      const rect = e.target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const width = rect.width;
      const hoverPercentage = (x / width) * 100;
      console.log("hoverPercentage", hoverPercentage);
      const currentFrame = Number(
        (Number(hoverPercentage?.toFixed(0)) / 100) *
          videoElement.current.duration
      ).toFixed(0);
      setPercentage(Number(hoverPercentage));
      setCurrentFrame(Number(currentFrame));
    }
  };

  const dispatch = useContext(PlayerDispatchContext);

  const handleVideoProgress = (event: any) => {
    if (videoElement.current) {
      const manualChange = Number(event.target.value);
      videoElement.current.currentTime =
        (videoElement.current.duration / 100) * manualChange;
      dispatch({ type: VIDEO_PROGRESS, payload: manualChange });
    }
  };

  const handleVideoSpeed = (event: any) => {
    if (videoElement.current) {
      const speed = Number(event.target.value);
      videoElement.current.playbackRate = speed;
      dispatch({ type: SPEED, payload: speed });
    }
  };

  const toggleMute = () => {
    if (videoElement.current) {
      videoElement.current.muted = !isMuted;
      dispatch({ type: MUTE_UNMUTE, payload: !isMuted });
    }
  };
  const formatTime = (time: number | any) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleMouseOver = () => {
    if (videoElement.current) {
      setTooltip(true);
    }
  };
  const handleLeave = () => {
    setPercentage(null);
  };

  useEffect(() => {
    const loadThumbnails = async () => {
      const thumbnailPromises = [];
      for (let i = 1; i <= 47; i++) {
        const importPromise = import(`./videoSprite/outputSprite_${i}.png`);
        thumbnailPromises.push(importPromise);
      }

      const thumbnailModules = await Promise.all(thumbnailPromises);
      const thumbnailUrls = thumbnailModules.map((module) => module.default);
      setThumbnails(thumbnailUrls);
    };

    loadThumbnails();
  }, []);

  const handleThumbnailClick = (time: number) => {
    if (videoElement.current) {
      videoElement.current.currentTime = time;
    }
  };
  return (
    <StyledViedoToolbar>
      <div style={{ width: "300px" }} onClick={onVideoClick}>
        {isPlaying ? "Pause" : "Play"}
      </div>
      <div
        style={{
          position: "relative",
        }}
        onMouseMove={handleHover}
        onMouseLeave={handleLeave}
      >
        <input
          style={{}}
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={(e) => handleVideoProgress(e)}
          onMouseOver={handleMouseOver}
          onMouseOut={() => setTooltip(false)}
        />
        {videoElement.current && tooltip && (
          <div style={{ position: "absolute", top: "-20px", right: "0rem" }}>
            {formatTime(Number(videoElement?.current.currentTime || 0))}
          </div>
        )}

        {percentage && thumbnails && (
          <img
            src={thumbnails[currentFrame || 0]}
            style={{
              width: "100px",
              height: "auto",
              cursor: "pointer",
              position: "absolute",
              left: `${percentage * 3}px`,
              bottom: "20px",
            }}
            onClick={() => handleThumbnailClick(percentage)} // Assuming interval is 10 seconds
          />
        )}
      </div>

      <div style={{ width: "300px" }}>
        <select
          className="velocity"
          value={speed}
          onChange={(e) => handleVideoSpeed(e)}
        >
          <option value="0.50">0.50x</option>
          <option value="1">1x</option>
          <option value="1.25">1.25x</option>
          <option value="2">2x</option>
        </select>
      </div>
      <div style={{ width: "300px" }} onClick={toggleMute}>
        {isMuted ? "Unmute" : "Mute"}
      </div>
      {videoElement.current && (
        <div style={{ width: "300px", color: "white" }}>{`${formatTime(
          videoElement?.current.currentTime
        )} | ${formatTime(videoElement.current?.duration)}`}</div>
      )}
    </StyledViedoToolbar>
  );
};

export default VideoToolbar;
