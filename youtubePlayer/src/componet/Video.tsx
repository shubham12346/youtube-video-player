import { useContext, useEffect, useRef } from "react";
import {
  PlayerContext,
  PlayerDispatchContext,
} from "../provider/PlayerContext";
import { PLAY_PAUSE } from "../provider/actions";

const Video = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { isPlaying, muted, volume } = useContext(PlayerContext);
  const dispatch = useContext(PlayerDispatchContext);

  const onPlayerPause = () => {
    dispatch({ type: PLAY_PAUSE, payload: !isPlaying });
  };
  console.log("isPlaying", isPlaying);
  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      console.log("video", video);
      if (!isPlaying) {
        video.play();
      } else {
        video.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (videoRef.current) {
      if (muted) {
        videoRef.current.muted = muted;
      }
    }
  }, [muted]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
    }
  }, [volume]);

  return (
    <div onClick={onPlayerPause} className="html-video-container">
      <video
        src="http://iandevlin.github.io/mdn/video-player/video/tears-of-steel-battle-clip-medium.mp4"
        ref={videoRef}
      />
    </div>
  );
};

export default Video;
