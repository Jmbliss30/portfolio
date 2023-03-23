import React, { useState, useRef } from 'react';

import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const Player = () => {
  const [trackIndex, setTrackIndex] = useState(0);
  const [currentArtist, setCurrentArtist] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectStyle, setSelectStyle] = useState();
  const [isPlay, setIsPlay] = useState(true);
  const [musicTracks, setMusicTracks] = useState([
    {
      id: 0,
      name: ' Nice piano and ukulele',
      src: 'https://www.bensound.com/bensound-music/bensound-buddy.mp3',
    },
    {
      id: 1,
      name: 'Gentle acoustic',
      src: 'https://www.bensound.com//bensound-music/bensound-sunny.mp3',
    },
    {
      id: 2,
      name: 'Corporate motivational',
      src: 'https://www.bensound.com/bensound-music/bensound-energy.mp3',
    },
  ]);
  const player = useRef();
  const ChangeCurrentSong = (index) => {
    setTrackIndex(index);

    setSelectStyle(index);
  };

  const handleClickPrevious = () => {
    setTrackIndex((currentTrack) => {
      if (currentTrack === 0) {
        return musicTracks.length - 1;
      } else {
        setSelectStyle(currentTrack - 1);
        return currentTrack - 1;
      }
    });
  };

  const handleClickNext = async () => {
    setTrackIndex((currentTrack) => {
      if (currentTrack < musicTracks.length - 1) {
        setSelectStyle(currentTrack + 1);
        return currentTrack + 1;
      } else {
        setSelectStyle(0);
        return 0;
      }
    });
  };

  const SwitchPause = () => {
    setIsPlaying(true);
    setIsPlay(false);
  };

  const SwitchPlay = () => {
    setIsPlaying(false);
    setIsPlay(true);
  };
  const selectSong = (index) => {
    setTrackIndex(index);
  };
  return (
    <div>
      <div className='title'>Click on the below songs to play</div>
      <div className='songs-list'>
        {musicTracks?.map((songs) => (
          <ul>
            <li onClick={() => selectSong(songs.id)}>{songs.name}</li>
          </ul>
        ))}
      </div>
      <div className='playertwo'>
        <AudioPlayer
          ref={player}
          autoPlay={false}
          src={musicTracks[trackIndex]?.src}
          onPlay={() => SwitchPlay()}
          onPause={() => SwitchPause()}
          showSkipControls={true}
          showJumpControls={true}
          header={`Now playing: ${musicTracks[trackIndex]?.name}`}
          onClickPrevious={() => handleClickPrevious()}
          onClickNext={() => handleClickNext()}
          onEnded={handleClickNext}
        />
      </div>
    </div>
  );
};
export default Player;
