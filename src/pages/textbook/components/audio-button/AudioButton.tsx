import React, { FC, useEffect } from 'react';
import { PlayCircleOutlined } from '@ant-design/icons';

type AudioButtonProps = {
  player: HTMLAudioElement;
  audioLinks: string[];
};

const AudioButton: FC<AudioButtonProps> = ({ player, audioLinks }) => {
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
  return <PlayCircleOutlined style={{ fontSize: '30px', cursor: 'pointer' }} onClick={playAudio} />;
};

export default AudioButton;
