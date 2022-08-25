import React, { FC, useEffect, useState } from 'react';
import { Button } from 'antd';
import { ReactComponent as PlayAudioIcon } from '../../../../assets/icons/volume.svg';

type PlayAudioProps = {
  autoplay: boolean,
  audioUrl: string
}

const PlayAudioButton: FC<PlayAudioProps> = (props) => {
  const { audioUrl, autoplay } = props;
  const audio = new Audio(audioUrl);
  const [isPlay, setPlay] = useState(false);

  if (autoplay) {
    audio.play();
    audio.addEventListener('ended', () => setPlay(false));
  }

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.code === 'Space') {
      setPlay(true);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

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

  return (
    <Button
      onClick={() => setPlay(true)}
      className="play-audio-button"
      type="text"
      icon={<PlayAudioIcon />}
    />
  );
};

export default PlayAudioButton;
