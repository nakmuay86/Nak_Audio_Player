import React, { useRef, useEffect, useState, useCallback } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faVolumeUp, faVolumeDown, faVolumeMute, faVolumeOff } from '@fortawesome/free-solid-svg-icons';

// Функция для конфигурации WaveSurfer
const formWaveSurferOptions = (ref) => ({
  container: ref,
  waveColor: '#ccc',
  progressColor: 'red',
  cursorColor: 'transparent',
  responsive: true,
  height: 55,
  normalize: true,
  backend: 'WebAudio',
  barWidth: 2,
  barGap: 3,
});

// Функция для форматирования времени
const formatTime = (seconds) => {
  const date = new Date(0);
  date.setSeconds(seconds);
  return date.toISOString().substr(11, 8);
};

// Компонент аудиоплеера
export default function AudioPlayer({ audioFiles }) {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [muted, setMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioFileIndex, setAudioFileIndex] = useState(0);
  const [audioFileName, setAudioFileName] = useState('');

  // Переход к следующему аудиофайлу
  const handleNextAudio = useCallback(() => {
    const nextIndex = (audioFileIndex + 1) % audioFiles.length;
    setAudioFileIndex(nextIndex);
    setCurrentTime(0);
    wavesurfer.current.stop();
    setPlaying(false);
  }, [audioFileIndex, audioFiles]);

  // Инициализация WaveSurfer
  useEffect(() => {
    if (audioFiles.length === 0) return;

    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);

    const loadAudioFile = () => {
      wavesurfer.current.load(audioFiles[audioFileIndex]);
      setPlaying(false);
    };

    loadAudioFile();

    wavesurfer.current.on('ready', () => {
      setVolume(wavesurfer.current.getVolume());
      setDuration(wavesurfer.current.getDuration());
      setAudioFileName(audioFiles[audioFileIndex].split('/').pop());
    });

    wavesurfer.current.on('audioprocess', () => {
      setCurrentTime(wavesurfer.current.getCurrentTime());
    });

    wavesurfer.current.on('finish', handleNextAudio);

    return () => {
      wavesurfer.current.un('audioprocess');
      wavesurfer.current.un('ready');
      wavesurfer.current.un('finish');
      wavesurfer.current.destroy();
    };
  }, [audioFileIndex, audioFiles, handleNextAudio]);

  const handlePlayPause = () => {
    setPlaying(!playing);
    wavesurfer.current.playPause();
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    wavesurfer.current.setVolume(newVolume);
    setMuted(newVolume === 0);
  };

  const handleMute = () => {
    setMuted(!muted);
    wavesurfer.current.setVolume(muted ? volume : 0);
  };

  const handleVolumeUp = () => {
    handleVolumeChange(Math.min(volume + 0.1, 1));
  };

  const handleVolumeDown = () => {
    handleVolumeChange(Math.max(volume - 0.1, 0));
  };

  return (
    <div>
      <img
      src="https://e.snmc.io/i/1200/s/14d5fc8f0a88be404bfa1b89ef2d844b/10186837"
      alt="Обложка"
      class="responsive-image"
       />
      <h2>Music title: {audioFileName}</h2>
      <div id="waveform" ref={waveformRef} style={{ width: '100%'}}></div>
      <div className="controls">
        <button onClick={handlePlayPause}>
          <FontAwesomeIcon icon={playing ? faPause : faPlay} />
        </button>
        <button onClick={handleMute}>
          <FontAwesomeIcon icon={muted ? faVolumeOff : faVolumeMute} />
        </button>
        <input
          type="range"
          id="volume"
          name="volume"
          min="0"
          max="1"
          step="0.05"
          value={muted ? 0 : volume}
          onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
        />
        <button onClick={handleVolumeDown}>
          <FontAwesomeIcon icon={faVolumeDown} />
        </button>
        <button onClick={handleVolumeUp}>
          <FontAwesomeIcon icon={faVolumeUp} />
        </button>
        {/* Кнопка для перехода к следующей музыке */}
        <div style={{ marginTop: '20px' }}>
        {/* Кнопка для перехода к следующей музыке с отступом сверху */}
        <button onClick={handleNextAudio}>
          Next Music
        </button>
      </div>
      </div>
      <div className="audio-info">
        <span>Music title: {audioFileName} <br /></span>
        <span>Duration: {formatTime(duration)} | Текущее время: {formatTime(currentTime)} <br /></span>
        <span>Volume: {Math.round(volume * 100)}%</span>
      </div>
    </div>
  );
}
