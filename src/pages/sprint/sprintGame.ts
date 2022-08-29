import { WORDS_FOR_GAME_SPRINT } from '../../constants';
import { WordToTrain } from '../../store/types';
import { getRandomIndex, shuffleArray } from '../../utils/helpers/gameHelpers';

type CurrentWord = Pick<WordToTrain, 'word' | 'wordTranslate' | 'id'>;

const getWordsToTrain = (words: WordToTrain[]): CurrentWord[] => {
  const wordsToTrain: CurrentWord[] = [];

  for (let i = 0; i < words.length; i += 1) {
    const random = Math.random();

    if (random > 0.5) {
      wordsToTrain.push({
        word: words[i].word,
        wordTranslate: words[i].wordTranslate,
        id: words[i].id,
      });
    } else {
      const randomIndex = getRandomIndex(WORDS_FOR_GAME_SPRINT);
      wordsToTrain.push({
        word: words[i].word,
        wordTranslate: words[randomIndex].wordTranslate,
        id: words[i].id,
      });
    }
  }

  return shuffleArray<CurrentWord>(wordsToTrain);
};

export const getRandomTranslate = (word: WordToTrain, randomArray: WordToTrain[]): CurrentWord => {
  const newCurrentWord: CurrentWord = { ...word };
  const random = Math.random();

  if (random > 0.5) {
    return newCurrentWord;
  }

  const randomIndex = getRandomIndex(randomArray.length);
  newCurrentWord.wordTranslate = randomArray[randomIndex].wordTranslate;

  return newCurrentWord;
};

export default getWordsToTrain;
