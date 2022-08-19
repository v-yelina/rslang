import { WordToTrain } from '../../store/slices/currentGame/currentGameSlice';

/* eslint-disable */
export const getTranslations = (words: WordToTrain[]) => words.reduce((prev: string[], word) => [...prev, word.wordTranslate], []);

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
const shuffleArray = (array: string[]) => {
  const arrayToShuffle = [...array]
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
  return arrayToShuffle;
}

export const getAnswerOptions = (word: WordToTrain, words: WordToTrain[]) => {
  const translations = getTranslations(words);
  const options = [word.wordTranslate];
  while (options.length < 5) {
    //stackoverflow.com/questions/4550505/getting-a-random-value-from-a-javascript-array
    const randomTranslation = translations[Math.floor(Math.random() * translations.length)];
    if (!options.includes(randomTranslation)) {
      options.push(randomTranslation);
    }
  }
  return shuffleArray(options);
};

export const getAnswerText:  (e:MouseEvent)=> string | undefined = (e) => {
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
}

export const checkAnswer = (answer:string, word:string) => answer === word;
