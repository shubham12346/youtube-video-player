import { useContext } from "react";
import {
  PlayerContext,
  PlayerDispatchContext,
} from "../provider/PlayerContext";
import { PLAY_PAUSE } from "../provider/actions";
import { HiMiniPlay, HiMiniPause } from "react-icons/hi2";
import styled from "styled-components";

type IconButtonProps = {
  iconSize?: string;
};

export const StyledIconButton = styled.button<IconButtonProps>`
  background-color: transparent;
  border: none;
  width: 45px;
  float: left;
  margin-bottom: 3px;
  color: inherit;
  font-size: ${(props) =>
    props.iconSize || props.iconSize !== "" ? props.iconSize : ""};
`;

const PlayButton = () => {
  const { isPlaying } = useContext(PlayerContext);
  const dispatch = useContext(PlayerDispatchContext);

  const onPlayPause = () => {
    dispatch({ type: PLAY_PAUSE, payload: !isPlaying });
  };
  return (
    <StyledIconButton onClick={onPlayPause}>
      {isPlaying ? <HiMiniPause size="25px" /> : <HiMiniPlay size="25px" />}
    </StyledIconButton>
  );
};

export default PlayButton;
