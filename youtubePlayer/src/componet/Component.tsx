import React, { useContext } from "react";
import { PlayerContext } from "../provider/PlayerContext";

const Component = () => {
  const { isPlaying, muted, volume } = useContext(PlayerContext);
  console.log("isPlaying", isPlaying, "volume", volume, "muted", muted);
  return (
    <div>
      <span>Component 1: isPlaying: {isPlaying}</span>
    </div>
  );
};

export default Component;
