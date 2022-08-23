import { getTranslations } from '../../helpers';
import { WordToTrain } from '../../store/slices/currentGame/currentGameSlice';

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
const shuffleArray = (array: string[]) => {
  const arrayToShuffle = [...array];
  for (let i = arrayToShuffle.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrayToShuffle[i], arrayToShuffle[j]] = [arrayToShuffle[j], arrayToShuffle[i]];
  }
  return arrayToShuffle;
};

export const getAnswerOptions = (word: WordToTrain, words: WordToTrain[]) => {
  const translations = getTranslations(words);
  const options = [word.wordTranslate];
  while (options.length < 5) {
    // stackoverflow.com/questions/4550505/getting-a-random-value-from-a-javascript-array
    const randomTranslation = translations[Math.floor(Math.random() * translations.length)];
    if (!options.includes(randomTranslation)) {
      options.push(randomTranslation);
    }
  }
  return shuffleArray(options);
};

// eslint-disable-next-line
export const getAnswerText: (e:MouseEvent)=> string | undefined = (e) => {
  const { target, currentTarget } = e;
  let answerText;
  if (target !== currentTarget) {
    const targetEl = target as HTMLElement;
    const targetChildrenCount = targetEl.childElementCount;
    const answerContainer = targetChildrenCount === 1
      ? targetEl.firstChild as HTMLElement : targetEl;
    if (answerContainer) {
      answerText = answerContainer.textContent?.replace(/\d\./, '').trim();
    }
  }
  return answerText;
};

export const checkAnswer = (answer:string, word:string) => answer === word;
