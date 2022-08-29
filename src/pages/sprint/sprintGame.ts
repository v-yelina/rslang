import { WORDS_FOR_GAME_SPRINT } from '../../constants';
import { WordToTrain } from '../../store/types';
import { getRandomIndex, shuffleArray } from '../../utils/helpers/gameHelpers';

type CurrentWord = Pick<WordToTrain, 'word' | 'wordTranslate'>;

const getWordsToTrain = (words: WordToTrain[]): CurrentWord[] => {
  const wordsToTrain: CurrentWord[] = [];

  for (let i = 0; i < words.length - 1; i += 1) {
    const random = Math.random();

    if (random > 0.5) {
      wordsToTrain.push({
        word: words[i].word,
        wordTranslate: words[i].wordTranslate,
      });
    } else {
      const randomIndex = getRandomIndex(WORDS_FOR_GAME_SPRINT);
      wordsToTrain.push({
        word: words[i].word,
        wordTranslate: words[randomIndex].wordTranslate,
      });
    }
  }

  return shuffleArray<CurrentWord>(wordsToTrain);
};

export default getWordsToTrain;
