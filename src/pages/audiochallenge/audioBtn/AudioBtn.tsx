import React, { FC, useEffect } from 'react';
import {
  PlayCircleOutlined,
} from '@ant-design/icons';

type PlayAudioProps = {
  src: string
}

const AudioBtn: FC<PlayAudioProps> = ({ src }) => {
  const track = new Audio(src);

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.code === 'Space') {
      track.play();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  useEffect(() => {
    track.play();
  }, [src]);

  return <PlayCircleOutlined style={{ fontSize: '3rem' }} onClick={() => track.play()} />;
};

export default AudioBtn;
