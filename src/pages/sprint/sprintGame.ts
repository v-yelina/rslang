import { WORDS_FOR_GAME_SPRINT } from '../../constants';
import { IWord } from '../../interfaces/IWord';
import { getRandomIndex, shuffleArray } from '../../utils/gameUtils';

type WordsToTrain = Pick<IWord, 'word' | 'wordTranslate' | 'id' | 'audio'>
type CurrentWord = Pick<WordsToTrain, 'word' | 'wordTranslate'>;

const getWordsToTrain = (words: WordsToTrain[]): CurrentWord[] => {
  const wordsToTrain: CurrentWord[] = [];

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

  return shuffleArray<CurrentWord>(wordsToTrain);
};

export default getWordsToTrain;
