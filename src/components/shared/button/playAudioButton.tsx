import React, { FC, useEffect, useState } from 'react';
import { Button } from 'antd';
// import IconPlayAudio from '../../../assets/icons/volume.svg';

type PlayAudioProps = {
  audioUrl: string
}

const PlayAudioButton: FC<PlayAudioProps> = (props) => {
  const { audioUrl } = props;
  const [audio] = useState(new Audio(audioUrl));
  const [isPlay, setPlay] = useState(false);

  useEffect(
    () => {
      if (isPlay) {
        audio.play();
      } else {
        audio.pause();
        audio.currentTime = 0;
      }
    },
    [isPlay],
  );

  useEffect(
    () => {
      audio.addEventListener('ended', () => setPlay(false));
      return () => {
        audio.removeEventListener('ended', () => setPlay(false));
      };
    },
    [],
  );

  return <Button onClick={() => setPlay(!isPlay)} />;
};

export default PlayAudioButton;