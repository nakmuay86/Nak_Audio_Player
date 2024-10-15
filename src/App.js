import React from 'react';
import './App.css';

import AudioFile1 from './Components/deadmau5 — The Oshawa Connection.mp3';
import AudioFile2 from './Components/deadmau5 — Unspecial Effects.mp3';
import AudioFile3 from './Components/deadmau5 — Messages from nowhere.mp3';
import AudioFile4 from './Components/deadmau5 — Sometimes I Fail.mp3';
import AudioFile5 from './Components/deadmau5 — Waking Up From the American Dream.mp3';
import AudioFile6 from './Components/deadmau5 — FlashTV.mp3';

import AudioPlayer from './Components/AudioPlayer';

// Список аудиофайлов
const audioFiles = [
  AudioFile1,
  AudioFile2,
  AudioFile3,
  AudioFile4,
  AudioFile5,
  AudioFile6,
];

function App() {
  return (
    <div>
      <AudioPlayer audioFiles={audioFiles} />
    </div>
  );
}

export default App;
