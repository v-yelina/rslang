import React, { FC, useEffect, useState } from 'react';
import { Button } from 'antd';
import './play-audio-button.scss';

type PlayAudioProps = {
  audioUrl: string
}

const PlayAudioButton: FC<PlayAudioProps> = (props) => {
  const { audioUrl } = props;
  const audio = new Audio(audioUrl);
  const [isPlay, setPlay] = useState(false);

  useEffect(
    () => {
      if (isPlay) {
        audio.play();
      } else {
        audio.pause();
        audio.currentTime = 0;
      }
      audio.addEventListener('ended', () => setPlay(false));
    },
    [isPlay],
  );

  return <Button onClick={() => setPlay(true)} className="play-audio-button" type="primary" />;
};

export default PlayAudioButton;
