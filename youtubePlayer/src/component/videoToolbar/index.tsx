import { RefObject, useContext } from "react";
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
  const dispatch = useContext(PlayerDispatchContext);

  const handleVideoProgress = (event: any) => {
    if (videoElement.current) {
      const manualChange = Number(event.target.value);
      videoElement.current.currentTime =
        (videoElement.current.duration / 100) * manualChange;
      dispatch({ type: VIDEO_PROGRESS, payload: manualChange });
      console.log("manualChange", manualChange);
    }
  };

  const handleVideoSpeed = (event: any) => {
    if (videoElement.current) {
      const speed = Number(event.target.value);
      videoElement.current.playbackRate = speed;
      console.log("speed", speed);
      dispatch({ type: SPEED, payload: speed });
    }
  };

  const toggleMute = () => {
    if (videoElement.current) {
      videoElement.current.muted = !isMuted;
      dispatch({ type: MUTE_UNMUTE, payload: !isMuted });
    }
  };
  return (
    <StyledViedoToolbar>
      <div onClick={onVideoClick}>{isPlaying ? "Pause" : "Play"}</div>
      <div>
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={(e) => handleVideoProgress(e)}
        />
      </div>
      <div>
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
      <div onClick={toggleMute}>{isMuted ? "Unmute" : "Mute"}</div>
    </StyledViedoToolbar>
  );
};

export default VideoToolbar;
