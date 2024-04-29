import { createContext, useReducer } from "react";
import { PlayerStatusType, initialState } from "./constant";
import { VideoReducer } from "./VideoReducer";

export const PAUSE_PLAY = "PUSH_PALY";

export const PlayerContext = createContext<PlayerStatusType>(initialState);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const PlayerDispatchContext = createContext<React.Dispatch<{
  type: string;
  payload: any;
}> | null>(null);

export function PlayerProvider({ children }: any) {
  const [state, dispatch] = useReducer(VideoReducer, initialState);

  return (
    <PlayerContext.Provider value={state}>
      <PlayerDispatchContext.Provider value={dispatch}>
        {children}
      </PlayerDispatchContext.Provider>
    </PlayerContext.Provider>
  );
}
