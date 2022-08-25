import React, { FC, useEffect, useState } from 'react';
import { Button } from 'antd';
import { ReactComponent as PlayAudioIcon } from '../../../../assets/icons/volume.svg';
import { useAppSelector } from '../../../../store/hooks';

type PlayAudioProps = {
  audioUrl: string;
}

const PlayAudioButton: FC<PlayAudioProps> = (props) => {
  const { audioUrl } = props;
  const audio = new Audio(audioUrl);
  const [isPlay, setPlay] = useState(false);
  const { gameType } = useAppSelector((state) => state.currentGame);

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.code === 'Space' && gameType === 'audiochallenge') {
      setPlay(true);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  useEffect(() => {
    if (isPlay) {
      audio.play();
    } else {
      audio.pause();
      audio.currentTime = 0;
      setPlay(false);
    }
    audio.addEventListener('ended', () => setPlay(false));
  }, [isPlay]);

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
