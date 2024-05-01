import { RefObject, useContext, useState } from "react";
import styled from "styled-components";
import {
  PlayerContext,
  PlayerDispatchContext,
} from "../../context/VideoContext";
import { MUTE_UNMUTE, SPEED, VIDEO_PROGRESS } from "../../context/VideoReducer";

export const StyledViedoToolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  position: absolute;
  background: red;
  width: 100%;
  height: 50px;
  bottom: 0rem;
  background: linear-gradient(to top, black, white);
  color: black;
  visibility: hidden;
  transition: all 0.3s ease-in-out;
`;
export type TvideoToolbar = {
  videoElement: RefObject<HTMLVideoElement>;
  onVideoClick: () => void;
};

const VideoToolbar = ({ videoElement, onVideoClick }: TvideoToolbar) => {
  const { isPlaying, progress, speed, isMuted } = useContext(PlayerContext);
  const [tooltip, setTooltip] = useState(false);

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

  return (
    <StyledViedoToolbar>
      <div style={{ width: "300px" }} onClick={onVideoClick}>
        {isPlaying ? "Pause" : "Play"}
      </div>
      <div
        style={{
          position: "relative",
          width: "300px",
        }}
      >
        <input
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
