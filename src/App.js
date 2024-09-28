import './App.css';

import AudioFile from './Components/audio.mp3'
import AudioPlayer from './Components/AudioPlayer';

function App() {
  return (
    <div>
      <AudioPlayer audioFile={AudioFile}/>
    </div>
  );
}

export default App;
