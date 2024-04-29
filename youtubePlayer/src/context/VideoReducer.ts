import { PlayerStatusType } from "./constant";

export const PAUSE_PLAY = "PUSH_PALY";
export const MUTE_UNMUTE = "MUTE_UNMUTE";
export const SPEED = "SPEED";
export const VIDEO_PROGRESS = "PROGRESS";

export function VideoReducer(
  state: PlayerStatusType,
  action: { type: string; payload: any }
): PlayerStatusType {
  switch (action.type) {
    case PAUSE_PLAY:
      return {
        ...state,
        isPlaying: action.payload,
      };
    case MUTE_UNMUTE:
      return {
        ...state,
        isMuted: action.payload,
      };
    case SPEED:
      return {
        ...state,
        speed: action.payload,
      };
    case VIDEO_PROGRESS:
      return {
        ...state,
        progress: action.payload,
      };
    default:
      return state;
  }
}
