import Video from "./component/Video";
import { PlayerProvider } from "./context/VideoContext";

function App() {
  return (
    <PlayerProvider>
      <div style={{ marginLeft: "100px" }}>
        <Video />
      </div>
    </PlayerProvider>
  );
}

export default App;
