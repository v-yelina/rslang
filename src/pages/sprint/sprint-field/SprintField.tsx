import React, { FC } from 'react';

import { useAppSelector } from '../../../store/hooks';
import SprintControls from '../sprint-controls';
import SprintMultiplier from '../sprint-multiplier';
import SprintWords from '../sprint-words';

const SprintField: FC = () => {
  const { currentWord } = useAppSelector((state) => state.sprintGame);

  return (
    <div className="sprint__field">
      <SprintMultiplier />
      <SprintWords
        word={currentWord.word}
        wordTranslate={currentWord.wordTranslate}
      />
      <SprintControls />
    </div>
  );
};

export default SprintField;
