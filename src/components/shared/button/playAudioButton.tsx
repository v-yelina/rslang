import React, { FC, useEffect, useState } from 'react';
import { Button } from 'antd';
import IconPlayAudio from '../../../assets/icons/volume.svg';

type PlayAudioProps = {
  audioUrl: string
}

const useAudio = (url: string) => {
  const [audio] = useState(new Audio(url));
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
};

const PlayAudioButton: FC<PlayAudioProps> = (props) => {
  const { audioUrl } = props;
  return <Button onClick={() => useAudio(audioUrl)} icon={<IconPlayAudio />} />;
};

export default PlayAudioButton;
