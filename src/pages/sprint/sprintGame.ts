import { WORDS_FOR_GAME_SPRINT } from '../../constants';
import { IWord } from '../../interfaces/IWord';
import { getRandomIndex, shuffleArray } from '../../utils/gameUtils';

export type WordsToTrain = Pick<IWord, 'word' | 'wordTranslate'>

const getWordsToTrain = (words: IWord[]): WordsToTrain[] => {
  const wordsToTrain: WordsToTrain[] = [];

  for (let i = 0; i < words.length; i += 1) {
    const random = Math.random();

    if (random > 0.7) {
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

  return shuffleArray<WordsToTrain>(wordsToTrain);
};

export default getWordsToTrain;
