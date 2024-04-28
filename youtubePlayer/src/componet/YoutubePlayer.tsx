import { PlayerProvider } from "../provider/PlayerContext";
import styled from "styled-components";
import Video from "./Video";
import BezelIcon from "./BezelIcon";
import ControlToolbar from "./ControlToolbar";

const StyledVideoContainer = styled.div`
  position: relative;
  width: fit-content;
  .video-controls {
    opacity: 0;
  }
  &:hover .video-controls {
    opacity: 1;
  }
`;
const YoutubePlayer = () => {
  return (
    <PlayerProvider>
      <StyledVideoContainer>
        <Video />
        <BezelIcon />
        <ControlToolbar />
      </StyledVideoContainer>
    </PlayerProvider>
  );
};

export default YoutubePlayer;
