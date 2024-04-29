export type PlayerStatusType = {
  isPlaying: boolean;
  progress: number;
  speed: 1 | 2 | 4;
  isMuted: boolean;
};
export const initialState: PlayerStatusType = {
  isPlaying: false,
  progress: 0,
  speed: 1,
  isMuted: false,
};
