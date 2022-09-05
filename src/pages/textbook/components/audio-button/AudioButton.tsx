import React, { FC, useEffect } from 'react';
import { PlayCircleOutlined } from '@ant-design/icons';

type AudioButtonProps = {
  player: HTMLAudioElement;
  audioLinks: string[];
  color: string;
};

const AudioButton: FC<AudioButtonProps> = ({ player, audioLinks, color }) => {
  const wordsPlayer = player;

  useEffect(() => () => wordsPlayer.pause(), []);
  const playAudio = () => {
    wordsPlayer.pause();
    wordsPlayer.currentTime = 0;

    let audioIndex = 0;
    wordsPlayer.src = audioLinks[audioIndex];
    wordsPlayer.play();
    wordsPlayer.onended = () => {
      audioIndex += 1;

      if (audioIndex < audioLinks.length) {
        wordsPlayer.src = audioLinks[audioIndex];
        wordsPlayer.play();
      }
    };
  };
  return (
    <PlayCircleOutlined
      style={{ fontSize: '30px', cursor: 'pointer', color }}
      onClick={playAudio}
    />
  );
};

export default AudioButton;
