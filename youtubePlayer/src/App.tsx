import "./App.css";
import { PlayerContext } from "./provider/PlayerContext";
import { initialState } from "./constant/constant";
import YoutubePlayer from "./componet/YoutubePlayer";

function App() {
  return (
    <>
      <PlayerContext.Provider value={initialState}>
        <YoutubePlayer />
      </PlayerContext.Provider>
    </>
  );
}

export default App;
