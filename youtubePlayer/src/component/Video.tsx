import { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { PlayerContext, PlayerDispatchContext } from "../context/VideoContext";
import { PAUSE_PLAY, VIDEO_PROGRESS } from "../context/VideoReducer";
import VideoToolbar, { StyledViedoToolbar } from "./videoToolbar";
const StyledVideoElement = styled.div``;

const StyledVideoContainer = styled.div`
  position: relative;
  width: fit-content;
  border: 2px solid black;
  &:hover ${StyledViedoToolbar} {
    visibility: visible; /* Show the toolbar when hovered */
  }
`;

const Video = () => {
  const videoElement = useRef<HTMLVideoElement>(null);
  const { isPlaying } = useContext(PlayerContext);
  const dispatch = useContext(PlayerDispatchContext);

  const onVideoClick = () => {
    dispatch?.({ type: PAUSE_PLAY, payload: !isPlaying });
  };

  const handleOnTimeUpdate = () => {
    if (videoElement.current) {
      const progress =
        (videoElement.current.currentTime / videoElement.current.duration) *
        100;
      dispatch({ type: VIDEO_PROGRESS, payload: progress });
    }
  };

  useEffect(() => {
    if (videoElement.current) {
      const video = videoElement.current;
      if (isPlaying) {
        video.play();
      } else {
        video.pause();
      }
    }
  }, [isPlaying]);

  return (
    <StyledVideoContainer>
      <StyledVideoElement onClick={onVideoClick}>
        <video
          src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4"
          ref={videoElement}
          height={"350px"}
          onTimeUpdate={handleOnTimeUpdate}
        />
      </StyledVideoElement>
      <VideoToolbar videoElement={videoElement} onVideoClick={onVideoClick} />
    </StyledVideoContainer>
  );
};

export default Video;
